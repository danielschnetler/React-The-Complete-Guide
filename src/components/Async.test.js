import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async Component", () => {
  test("Renders Posts if request succeeds", async () => {
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
