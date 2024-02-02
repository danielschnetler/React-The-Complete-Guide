import React, { ReactNode, createContext, useReducer } from "react";

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IMeal {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface ICartContext {
  cartItems: ICartItem[];
  addItemToCart: (meal: IMeal) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCartItems: () => void;
}

export const CartContext: React.Context<ICartContext> =
  createContext<ICartContext>({
    cartItems: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
    clearCartItems: () => {},
  });

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingItem = state.cartItems.findIndex(
      (item) => item.id === action.meal.id
    );
    if (existingItem === -1) {
      const newItem = action.meal;
      const updatedItems: ICartItem[] = [
        ...state.cartItems,
        {
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
        },
      ];
      return { ...state, cartItems: updatedItems };
    }
    let updatedCartItems = [...state.cartItems];
    updatedCartItems[existingItem].quantity += 1;
    return { ...state, cartItems: updatedCartItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItem = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    if (existingItem === -1) {
      throw Error("No such item found");
    }
    return {
      ...state,
      cartItems: state.items.filter((item) => item.id !== action.id),
    };
  }
  if (action.type === "UPDATE_QUANTITY") {
    const existingItem = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    let updatedCartItems = [...state.cartItems];
    updatedCartItems[existingItem].quantity += action.quantity;
    if (updatedCartItems[existingItem].quantity < 1) {
      updatedCartItems.splice(existingItem, 1);
    }
    return { ...state, cartItems: updatedCartItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, cartItems: [] };
  }

  return state;
};

interface ICartContextProvider {
  children: ReactNode;
}

const CartContextProvider: React.FC<ICartContextProvider> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    cartItems: [],
  });

  const handleAddItemToCart = (mealItem: IMeal) => {
    dispatchCartAction({ type: "ADD_ITEM", meal: mealItem });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatchCartAction({ type: "UPDATE_QUANTITY", id: id, quantity: quantity });
  };

  const handleClearCart = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const contextValue = {
    cartItems: cartState.cartItems,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateQuantity,
    clearCartItems: handleClearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
