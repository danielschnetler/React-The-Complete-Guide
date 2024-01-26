import { ReactNode, createContext } from "react";

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
