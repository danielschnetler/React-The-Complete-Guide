import { useCallback, useState } from "react";
import QUESTIONS from "../data/Questions";
import Question from "./Question";
import Summary from "./Summary";

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const activeQuestionIndex = userAnswers.length;
  const quizCompleted: boolean = activeQuestionIndex === QUESTIONS.length;

  const saveAnswer = useCallback(function saveAnswer(answer: string) {
    setUserAnswers((prevAnswers) => {
      const newAnwers = [...prevAnswers, answer];
      return newAnwers;
    });
  }, []);

  const onSkipAnswer = useCallback(() => saveAnswer(""), [saveAnswer]);

  if (quizCompleted) {
    return <Summary userAnsers={userAnswers} />;
  }
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSkipAnswer={onSkipAnswer}
        onSelectAnswer={saveAnswer}
      />
    </div>
  );
};

export default Quiz;
