import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

interface IQuestion {
  questionText: string;
  answers: string[];
  onSelectAnswer: (text: string) => void;
  selectedAnswer: string;
  answerState: string;
  onSkipAnswer: () => void;
}

const TIMER = 15000;

const Question: React.FC<IQuestion> = ({
  answers,
  onSelectAnswer,
  questionText,
  answerState,
  selectedAnswer,
  onSkipAnswer,
}) => {
  return (
    <div id="question">
      <QuestionTimer onTimeout={onSkipAnswer} timeout={TIMER} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
};

export default Question;
