import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import Cart from "./Cart";
import { CartContext } from "../store/shopping-cart-context";
import { Button } from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import Checkout from "./Checkout";

const Header: React.FC = () => {
  const { cartItems } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const numberOfItems =
    cartItems &&
    cartItems.reduce((previousValue, item) => previousValue + 1, 0);

  return (
    <>
      <Cart />
      <Checkout />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Company Logo" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={showCart}>
            Cart ({numberOfItems})
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
