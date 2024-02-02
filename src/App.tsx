import Header from "./components/Header";
import Meals from "./components/Meals";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import CartContextProvider from "./store/shopping-cart-context";
import React from "react";

const App: React.FC = () => {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <main>
          <Meals />
        </main>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
};

export default App;
