import { useCallback, useState } from "react";
import QUESTIONS from "../data/Questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question";

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

  const content = !quizCompleted ? (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSkipAnswer={onSkipAnswer}
        onSelectAnswer={saveAnswer}
      />
    </div>
  ) : (
    <div id="summary">
      <img src={quizCompleteImage} alt="Quiz complete image"></img>
      {/* <ul>
        {QUESTIONS.map((item, index) => {
          const correctAnswer = userAnswers[index] === 0;
          const className = correctAnswer ? ".correct" : ".wrong";
          return (
            <li key={index}>
              <h3 id="question">{item.text}</h3>
              <p id="user-answer" className={className}>
                Your answer was {correctAnswer ? "correct" : "wrong"}
              </p>
            </li>
          );
        })}
      </ul> */}
    </div>
  );

  return content;
};

export default Quiz;
