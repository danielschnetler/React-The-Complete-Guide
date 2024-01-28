import { useRef } from "react";

interface IAnswers {
  answers: string[];
  selectedAnswer: string;
  answerState: string;
  onSelect: (text: string) => void;
}

const Answers: React.FC<IAnswers> = ({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) => {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((item, index) => {
        let cssClasses = "";
        const isSelected = selectedAnswer === item;
        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }
        if (
          isSelected &&
          (answerState === "correct" || answerState === "wrong")
        ) {
          cssClasses = answerState;
        }
        return (
          <li key={`${index}`} className={"answer " + answerState}>
            <button
              onClick={() => onSelect(item)}
              className={cssClasses}
              disabled={selectedAnswer !== ""}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
