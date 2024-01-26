import { useState, createContext, ReactNode } from "react";
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
const CartContextProvider: React.FC<ICartContextProvider> = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState<ICartContext>({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
  });

  function handleAddItemToCart(id: string) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product!.title,
          price: product!.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const contextValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
