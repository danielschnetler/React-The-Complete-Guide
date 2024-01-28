import quizCompleteImage from "../assets/quiz-complete.png";
import QUESTIONS from "../data/Questions";

interface ISummary {
  userAnsers: string[];
}

const Summary: React.FC<ISummary> = ({ userAnsers }) => {
  const skippedAnswers = userAnsers.filter((answer) => answer === "");
  const correctAnswers = userAnsers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedPercent = Math.round(
    (skippedAnswers.length / QUESTIONS.length) * 100
  );
  const correctPercent = Math.round(
    (correctAnswers.length / QUESTIONS.length) * 100
  );
  const wrongPercent = Math.round(100 - skippedPercent - correctPercent);

  return (
    <div id="summary">
      <img src={quizCompleteImage} alt="Quiz complete trophy icon" />
      <h2>Quiz Completed! </h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongPercent}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      {userAnsers && (
        <ol>
          {userAnsers.map((answer, index) => {
            let cssClass = "user-answer";
            if (!answer) cssClass += " skipped";
            else if (answer === QUESTIONS[index].answers[0]) {
              cssClass += " correct";
            } else cssClass += " wrong";

            return (
              <li key={index}>
                <h3>{index + 1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer ?? "Skipped"}</p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default Summary;
