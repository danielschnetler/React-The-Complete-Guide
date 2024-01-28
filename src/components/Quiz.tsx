import { useCallback, useState } from "react";
import QUESTIONS from "../data/Questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question";

const Quiz: React.FC = () => {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizCompleted: boolean = activeQuestionIndex === QUESTIONS.length;

  const saveAnswer = useCallback(
    function saveAnswer(answer: string) {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => {
        const newAnwers = [...prevAnswers, answer];
        return newAnwers;
      });

      const result = answer === QUESTIONS[activeQuestionIndex].answers[0];

      setTimeout(() => {
        setAnswerState(result ? "correct" : "wrong");

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const onSkipAnswer = useCallback(() => saveAnswer(""), [saveAnswer]);

  const content = !quizCompleted ? (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={saveAnswer}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={onSkipAnswer}
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
