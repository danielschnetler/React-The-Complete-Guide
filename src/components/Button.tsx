import { ReactNode } from "react";
// import styled from "styled-components";

// const Button1 = styled.button`
//   padding: 1rem 2rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   border-radius: 0.25rem;
//   color: #1f2937;
//   background-color: #f0b322;
//   border-radius: 6px;
//   border: none;
//   &:hover {
//     background-color: #f0920e;
//   }
// `;

interface IButton {
  children: ReactNode;
}

const Button: React.FC<IButton> = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-amber-400 hover:bg-amber-600"
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
