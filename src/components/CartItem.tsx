import React, { useContext } from "react";
import { CartContext, ICartItem } from "../store/shopping-cart-context";
import { currencyFormatter } from "../util/formatting";

const CartItem: React.FC<ICartItem> = ({ id, name, price, quantity }) => {
  const { updateItemQuantity } = useContext(CartContext);
  return (
    <li className="cart-item" key={id}>
      <p>
        {name} - {currencyFormatter.format(quantity * price)}
      </p>
      <p className="cart-item-actions">
        <button
          className="text-button"
          key="minus"
          onClick={() => updateItemQuantity(id, -1)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="text-button"
          key="plus"
          onClick={() => updateItemQuantity(id, 1)}
        >
          {" "}
          +
        </button>
      </p>
    </li>
  );
};

export default CartItem;
