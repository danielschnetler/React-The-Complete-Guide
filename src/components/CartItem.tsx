import React, { useContext } from "react";
import { CartContext, ICartItem } from "../store/shopping-cart-context";

const CartItem: React.FC<ICartItem> = ({ id, name, price, quantity }) => {
  const { updateItemQuantity } = useContext(CartContext);
  return (
    <li className="cart-item" key={id}>
      <span>
        <p>{name}</p>
      </span>
      <span className="cart-item-actions">
        <button
          className="text-button"
          key="minus"
          onClick={() => updateItemQuantity(id, -1)}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          className="text-button"
          key="plus"
          onClick={() => updateItemQuantity(id, 1)}
        >
          +
        </button>
      </span>
    </li>
  );
};

export default CartItem;
