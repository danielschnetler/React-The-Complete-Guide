import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test("Hello World Text exists", () => {
  //Arrange
  render(<Greeting />);
  //Act
  //Assert
  const heading = screen.getByText("Hello World", { exact: false });
  expect(heading).toBeInTheDocument();
});
