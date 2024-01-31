import { useState } from "react";

export function useInput(
  defaultValue: string,
  validationFn: (input: string) => boolean
) {
  const [enteredValue, setEnteredValue] = useState<string>(defaultValue);
  const [didEdit, setDidEdit] = useState<boolean>(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
