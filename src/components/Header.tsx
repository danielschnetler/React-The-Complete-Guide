import { ReactNode } from "react";

interface IHeader {
  children: ReactNode;
}
export default function Header({ children }: IHeader) {
  return (
    <>
      <div id="main-header-loading"></div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
