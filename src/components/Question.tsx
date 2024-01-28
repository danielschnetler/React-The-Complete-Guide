import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../data/Questions";

interface IQuestion {
  index: number;
  onSkipAnswer: () => void;
  onSelectAnswer: (text: string) => void;
}

const TIMER = 15000;

const Question: React.FC<IQuestion> = ({
  index,
  onSkipAnswer,
  onSelectAnswer,
}) => {
  const [answer, setAnswer] = useState<{
    selectedAnswer: string;
    isCorrect: boolean;
    answerState: string;
  }>({
    selectedAnswer: "",
    isCorrect: false,
    answerState: "unanswered",
  });

  function handleSelectAnswer(text: string) {
    setAnswer((prevAnswer) => {
      const newAnswer = { ...prevAnswer, answerState: "selected" };
      return newAnswer;
    });

    const result = text === QUESTIONS[index].answers[0];

    setTimeout(() => {
      setAnswer((prevAnswer) => {
        const newAnswer = {
          ...prevAnswer,
          selectedAnswer: text,
          isCorrect: result,
        };
        return newAnswer;
      });

      setTimeout(() => {
        onSelectAnswer(text);
      }, 2000);
    }, 1000);
  }

  let timer = TIMER;

  if (answer.selectedAnswer) {
    answer.answerState = answer.isCorrect ? "correct" : "wrong";
    timer = 2000;
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        onTimeout={
          answer.answerState === "unanswered" ? onSkipAnswer : () => {}
        }
        timeout={timer}
        mode={answer.answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answer.answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
