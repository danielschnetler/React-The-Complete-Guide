import { isTemplateElement } from "@babel/types";
import React, {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";

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
  meals: IMeal[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

export const CartContext: React.Context<ICartContext> =
  createContext<ICartContext>({
    cartItems: [],
    meals: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
  });

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingItem = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    if (existingItem === -1) {
      const newItem = state.meals?.find((item) => item.id === action.id);
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
    updatedCartItems[existingItem].quantity += action.quantity;
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
  if (action.type == "UPDATE_DATA") {
    return { ...state, meals: action.data };
  }

  return state;
};

interface ICartContextProvider {
  children: ReactNode;
}

const CartContextProvider: React.FC<ICartContextProvider> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    cartItems: [],
    meals: [],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        console.log("Error retrieving server data");
        return;
      }
      const data = await response.json();
      dispatchCartAction({ type: "UPDATE_DATA", data: data });
    };
    getData();
  }, []);

  const handleAddItemToCart = (id: string) => {
    dispatchCartAction({ type: "ADD_ITEM", id: id });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatchCartAction({ type: "UPDATE_QUANTITY", id: id, quantity: quantity });
  };

  const contextValue = {
    cartItems: cartState.cartItems,
    meals: cartState.meals,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
