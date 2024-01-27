import { createContext, ReactNode, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface ICartContext {
  items: ICartItem[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<ICartContext>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

interface ICartContextProvider {
  children: ReactNode;
}

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product!.title,
        price: product!.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
}

const CartContextProvider: React.FC<ICartContextProvider> = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
  });

  function handleAddItemToCart(id: string) {
    cartDispatch({ type: "ADD_ITEM", payload: id });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    cartDispatch({ type: "UPDATE_ITEM", payload: { productId, amount } });
  }

  const contextValue = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
