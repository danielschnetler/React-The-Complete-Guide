import React, { ChangeEvent, FormEvent, useState } from "react";

const Login: React.FC = () => {
  const [enteredValues, setEnteredValues] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  function handleInputChange(identifier: string, value: string) {
    setEnteredValues((prevState) => ({
      ...prevState,
      [identifier]: value,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("Submitted");
    console.log(enteredValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues?.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues?.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
};
export default Login;
