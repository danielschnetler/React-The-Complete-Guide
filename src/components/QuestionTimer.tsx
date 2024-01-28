import { useEffect, useState } from "react";

interface IQuestionTimer {
  timeout: number;
  onTimeout: () => void;
}

const QuestionTimer: React.FC<IQuestionTimer> = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState<number>(timeout);

  useEffect(() => {
    //console.log("Timer Set");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
      setRemainingTime(timeout);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    //console.log("Interval Set");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
      //console.log("Decrementing interval");
    }, 100); //executes 10 times per second

    return () => {
      //console.log("Clearing interval");
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={timeout - remainingTime}
      max={timeout}
    />
  );
};

export default QuestionTimer;
