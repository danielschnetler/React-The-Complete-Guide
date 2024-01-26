import { ReactNode, createContext } from "react";

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface ICartContext {
  items: ICartItem[];
}

export const CartContext = createContext<ICartContext>(
  {
    items: [],
  }
);
