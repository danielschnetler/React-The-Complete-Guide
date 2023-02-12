import { useState } from "react";
import Output from "./Output";

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
      <Output> {!changedText ? "It's good to see you!" : "Changed!"} </Output>
      <button onClick={changeTextHandler}>Change Text!</button>
    </div>
  );
};

export default Greeting;
