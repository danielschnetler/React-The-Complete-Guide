import { useEffect, useState } from "react";

interface IProgressBar {
    timer: number;
}

const ProgressBar: React.FC<IProgressBar> = ({timer}) => {
  const [remainingTime, setRemainingTime] = useState<number>(timer);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10); //executes 100 times per second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={timer - remainingTime} max={timer} />;
};

export default ProgressBar;
