import logo from "../../public/logo.jpg";

const Header: React.FC = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Company Logo" />
        <h1>ReactFood</h1>
      </div>
      <button>Cart</button>
    </header>
  );
};

export default Header;
