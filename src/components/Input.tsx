import { ReactNode } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
`;

const Input = styled.input`
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
  return (
    <p className="paragraph">
      <Label $invalid={invalid}>{label}</Label>
      <Input $invalid={invalid} {...props} />
    </p>
  );
}
