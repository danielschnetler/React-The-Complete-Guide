import { memo, useCallback, useEffect, useMemo, useState } from "react";

import IconButton from "../UI/IconButton";
import MinusIcon from "../UI/Icons/MinusIcon";
import PlusIcon from "../UI/Icons/PlusIcon";
import CounterOutput from "./CounterOutput";
import { log } from "../../log.ts";
import CounterHistory from "./CounterHistory.tsx";

function isPrime(number: number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const getId = () => {
  return Math.random() * 1000;
};

const Counter = memo(function Counter({
  initialCount,
}: {
  initialCount: number;
}) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );
  const [counterChanges, setCounterChanges] = useState<
    { value: number; id: number }[]
  >([]);

  useEffect(() => {
    setCounterChanges([{ value: initialCount, id: getId() }]);
  }, [initialCount]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(() => {
    setCounterChanges((prevChanges) => [
      { value: -1, id: getId() },
      ...prevChanges,
    ]);
  }, []);

  const handleIncrement = useCallback(() => {
    setCounterChanges((prevChanges) => [
      { value: 1, id: getId() },
      ...prevChanges,
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;
