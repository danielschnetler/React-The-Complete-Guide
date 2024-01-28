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
      const newAnswer = { ...prevAnswer, answerState: "answered" };
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

  let answerState = "";
  if (answer.answerState === "answered") {
    answerState = "selected";
  }
  if (answer.selectedAnswer) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }

  return (
    <div id="question">
      <QuestionTimer onTimeout={onSkipAnswer} timeout={TIMER} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
