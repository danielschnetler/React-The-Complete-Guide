import React, { ReactNode } from "react";

interface IButton {
  children?: ReactNode;
  textOnly?: boolean;
  className?: string;
  onClick?: () => void;
}
export const Button: React.FC<IButton> = ({
  children,
  textOnly,
  className,
  ...props
}) => {
  const cssClasses = textOnly
    ? `${className} text-button`
    : `${className} button`;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};
