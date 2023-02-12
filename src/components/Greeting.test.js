import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting Component", () => {
  test("Hello World Text exists", () => {
    //Arrange
    render(<Greeting />);
    //Act
    //Assert
    const heading = screen.getByText("Hello World", { exact: false });
    expect(heading).toBeInTheDocument();
  });

  test("Original text exists and changes when button is pressed", () => {
    //Arange
    render(<Greeting />);
    //Act
    //Assert
    const paragraph = screen.getByText("It's good to see you!");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).not.toHaveTextContent("Changed!");

    //Act
    const button = screen.getByRole("button");
    userEvent.click(button);
    //Assert
    expect(paragraph).not.toHaveTextContent("It's good to see you!");
    expect(paragraph).toHaveTextContent("Changed!");
  });
});
