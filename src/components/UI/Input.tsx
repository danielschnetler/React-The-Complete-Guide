interface IInput {
  id: string;
  label: string;
  type?: string;
}

const Input: React.FC<IInput> = ({ id, label, ...props }) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
    </p>
  );
};

export default Input;
