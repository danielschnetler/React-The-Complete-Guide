import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Results from "./components/Results";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    anualInvestment: 1200,
    expectedReturn: 0.06,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;

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
      {!inputIsValid && <p>Please enter a valid value</p>}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  );
}

export default App;
