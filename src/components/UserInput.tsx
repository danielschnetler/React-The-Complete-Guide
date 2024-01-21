interface IUserInput {
  onUpdate: (inputIdentitier: string, newValue: number) => void;
  userInput: {
    initialInvestment: number;
    anualInvestment: number;
    expectedReturn: number;
    duration: number;
  };
}
const UserInput: React.FC<IUserInput> = ({ onUpdate, userInput }) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onUpdate("initialInvestment", event.target.value)
            }
            value={userInput.initialInvestment}
          />
        </p>
        <p>
          <label>Anual Investment</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onUpdate("anualInvestment", event.target.value)
            }
            value={userInput.anualInvestment}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            required
            onChange={(event) => onUpdate("expectedReturn", event.target.value)}
            value={userInput.expectedReturn}
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            required
            onChange={(event) => onUpdate("duration", event.target.value)}
            value={userInput.duration}
          />
        </p>
      </div>
    </section>
  );
};
export default UserInput;
