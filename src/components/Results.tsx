import { calculateInvestmentResults, formatter } from "../util/investment";

interface IResults {
  userInput: {
    initialInvestment: number;
    anualInvestment: number;
    expectedReturn: number;
    duration: number;
  };
}

const Results: React.FC<IResults> = ({ userInput }) => {
  let result: any = [];
  if (userInput) {
    result = calculateInvestmentResults({
      initialInvestment: userInput.initialInvestment,
      annualInvestment: userInput.anualInvestment,
      expectedReturn: userInput.expectedReturn,
      duration: userInput.duration,
    });
  }
  
  if (result?.length === 0) return <p>Please enter a valid value</p>;

  let initialInvestment: number;
  if (result)
    initialInvestment =
      result[0].valueEndOfYear -
      result[0].interest -
      result[0].annualInvestment;

  return (
    <div id="result" className="center">
      {result && (
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (year)</th>
              <th>Total Interest</th>
              <th>Annual Investment</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {result.map((row, index) => {
              const totalInterest =
                row.valueEndOfYear -
                row.annualInvestment * row.year -
                userInput.initialInvestment;
              initialInvestment;
              const totalAmountInvested = row.valueEndOfYear - totalInterest;
              return (
                <tr key={index}>
                  <td>{row.year}</td>
                  <td>{formatter.format(row.valueEndOfYear)}</td>
                  <td>{formatter.format(row.interest)}</td>
                  <td>{formatter.format(totalInterest)}</td>
                  <td>{formatter.format(row.annualInvestment)}</td>
                  <td>{formatter.format(totalAmountInvested)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
