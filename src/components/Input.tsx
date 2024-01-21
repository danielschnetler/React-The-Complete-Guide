import { ReactNode } from "react";
import styled from "styled-components";

const Label1 = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
`;

const Input1 = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  ${({ $invalid }) =>
    $invalid
      ? "color: #374151; border-color: #f73f3f; background-color: #fed2d2;"
      : "color: #374151; border: 1px solid transparent; background-color: #d1d5db;"};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

interface ICustomInput {
  label: ReactNode;
  invalid: boolean;
}

export default function CustomInput({
  label,
  invalid,
  ...props
}: ICustomInput) {
  let labelClasses = "block mb-2 text-xs font-bold tracking-wide uppercase";
  let inputClasses = "w-full px-3 py-2 leading-tight border rounded shadow"
  if (invalid) {
    labelClasses += " text-red-400";
    inputClasses += " text-red-500 bg-reg-100 border-red-300";
  } else {
    labelClasses += " text-stone-300";
    inputClasses += " text-gray-700 bg-stone-300";
  }
  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input
        className={inputClasses}
        {...props}
      />
    </p>
  );
}
