import { useEffect, useState } from "react";

interface IQuestionTimer {
  timeout: number;
  onTimeout: () => void;
  mode: string;
}

const QuestionTimer: React.FC<IQuestionTimer> = ({
  timeout,
  onTimeout,
  mode,
}) => {
  const [remainingTime, setRemainingTime] = useState<number>(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      console.log("Clearing interval");
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={timeout - remainingTime}
      max={timeout}
      className={mode}
    />
  );
};

export default QuestionTimer;
