import QuizLogo from "../assets/quiz-logo.png";

const Header: React.FC = () => {
  return (
    <header>
      <img src={QuizLogo} alt="Logo for the quiz"/>
      <h1>ReactQuiz</h1>
    </header>
  );
};

export default Header;
