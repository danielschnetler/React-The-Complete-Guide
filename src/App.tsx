import { useState } from "react";

import Counter from "./components/Counter/Counter";
import Header from "./components/Header";
import { log } from "./log.ts";
import ConfigureCounter from "./components/Counter/ConfigureCounter.tsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(value: number) {
    setChosenCount(value);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter setChosenCount={handleSetCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
