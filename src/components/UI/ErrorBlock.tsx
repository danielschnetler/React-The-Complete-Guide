interface IErrorBlock {
  title: string;
  message: string;
}

export default function ErrorBlock({ title, message }: IErrorBlock) {
  return (
    <div className="error-block">
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
