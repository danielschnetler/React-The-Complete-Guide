import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import React from "react";
import CartItem from "./CartItem";
import { currencyFormatter } from "../util/formatting";
import Modal from "./Modal";
import { Button } from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

const Cart: React.FC = ({ ...props }) => {
  const { cartItems } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const totalPrice =
    cartItems &&
    cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? hideCart : () => {}}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartItems &&
          cartItems.map((item, index) => <CartItem key={index} {...item} />)}
      </ul>
      <span className="cart-total">
        Total {currencyFormatter.format(totalPrice)}
      </span>
      <span className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        {cartItems.length > 0 && (
          <Button onClick={showCheckout}>Checkout</Button>
        )}
      </span>
    </Modal>
  );
};

export default Cart;
