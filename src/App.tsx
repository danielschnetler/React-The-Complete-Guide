import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/shopping-cart-context";
import React from "react";

const App: React.FC = () => {
  return (
    <CartContextProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
};

export default App;
