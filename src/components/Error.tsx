interface IError {
  title: string;
  message: string;
}
const Error: React.FC<IError> = ({ title, message }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
