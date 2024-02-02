import React, { ReactNode, useState } from "react";
import { createContext } from "react";

interface IUserProgressContext {
  progress: string;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
}
export const UserProgressContext: React.Context<IUserProgressContext> =
  createContext<IUserProgressContext>({
    progress: "",
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
  });

interface IUserProgressContextProvider {
  children: ReactNode;
}
export const UserProgressContextProvider: React.FC<
  IUserProgressContextProvider
> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<string>("");

  const handleShowCart = () => {
    setUserProgress("cart");
  };

  const handleHideCart = () => {
    setUserProgress("");
  };
  const handleShowCheckout = () => {
    setUserProgress("checkout");
  };

  const handleHideCheckout = () => {
    setUserProgress("");
  };

  const contextValue = {
    progress: userProgress,
    showCart: handleShowCart,
    hideCart: handleHideCart,
    showCheckout: handleShowCheckout,
    hideCheckout: handleHideCheckout,
  };
  return (
    <UserProgressContext.Provider value={contextValue}>
      {children}
    </UserProgressContext.Provider>
  );
};
