import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { createPortal } from "react-dom";
import React from "react";
import CartItem from "./CartItem";
import { currencyFormatter } from "../util/formatting";

const CartModal: React.FC = forwardRef((props, ref) => {
  const { cartItems } = useContext(CartContext);
  const dialog = useRef();

  const totalPrice =
    cartItems &&
    cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );

  useImperativeHandle(ref, () => {
    return {
      open: () => dialog.current.showModal(),
    };
  });

  return createPortal(
    <dialog className="cart" ref={dialog}>
      <span className="modal-heading">
        <h2>Meal(s)</h2>
        <h2>Quantity</h2>
      </span>
      <ul>{cartItems && cartItems.map((item) => <CartItem {...item} />)}</ul>
      <span className="cart-total">
        Total {currencyFormatter.format(totalPrice)}
      </span>
      <span className="modal-actions">
        <button className="text-button">Checkout</button>
      </span>
    </dialog>,
    document.getElementById("modal")!
  );
});

export default CartModal;
