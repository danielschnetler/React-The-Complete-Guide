interface IError {
  title: string;
  message: string;
  onConfirm: () => void;
}

const ErrorComponent: React.FC<IError> = ({ title, message, onConfirm }) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
};
export default ErrorComponent;
