import React, { useContext, useRef } from "react";
import logo from "../assets/logo.jpg";
import CartModal from "./CartModal";
import { CartContext } from "../store/shopping-cart-context";
import { Button } from "./UI/Button";

const Header: React.FC = () => {
  const modalRef = useRef();
  const { cartItems } = useContext(CartContext);

  function onCartClick() {
    modalRef.current.open();
  }

  const numberOfItems =
    cartItems &&
    cartItems.reduce((previousValue, item) => previousValue + 1, 0);

  return (
    <>
      <CartModal ref={modalRef} />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Company Logo" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={onCartClick}>
            Cart ({numberOfItems})
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
