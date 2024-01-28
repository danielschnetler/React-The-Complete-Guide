import { useState } from "react";
import { log } from "../../log";

interface IConfigureCounter {
  setChosenCount: (value: number) => void;
}

const ConfigureCounter: React.FC<IConfigureCounter> = ({ setChosenCount }) => {
  log("<ConfigureCounter />", 1);
  const [enteredNumber, setEnteredNumber] = useState<number>(0);

  function handleChange(event: { target: { value: string | number } }) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
};

export default ConfigureCounter;
