import { booleanLiteral } from "@babel/types";
import { bool } from "prop-types";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Login: React.FC = () => {
  const [enteredValues, setEnteredValues] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [valuesEntered, setValuesEntered] = useState<{
    email: boolean;
    password: boolean;
  }>({ email: false, password: false });

  function handleInputChange(identifier: string, value: string) {
    setEnteredValues((prevState) => ({
      ...prevState,
      [identifier]: value,
    }));
    setValuesEntered((prevValues) => ({ ...prevValues, [identifier]: false }));
  }

  function handleInputBlur(identifier: string) {
    setValuesEntered((prevValues) => ({ ...prevValues, [identifier]: true }));
  }

  const emailIsInvalid =
    enteredValues.email && !enteredValues.email.includes("@");

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
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues?.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div>
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
