import { useState } from "react";
import "./InvestmentCalculator.css";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Results from "./components/Results";

function InvestmentCalculator() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    anualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  
  function updateUserInput(inputIdentitier: string, newValue: number) {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [inputIdentitier]: +newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput onUpdate={updateUserInput} userInput={userInput} />
      <Results userInput={userInput} />
    </>
  );
}

export default InvestmentCalculator;
