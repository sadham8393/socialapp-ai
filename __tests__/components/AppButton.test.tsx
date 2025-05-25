import { fireEvent, render, screen } from "@testing-library/react";
import AppButton from "../../src/components/AppButton";

describe("AppButton", () => {
  it("renders with the correct label", () => {
    render(<AppButton label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders children if no label is provided", () => {
    render(<AppButton>Child Text</AppButton>);
    expect(screen.getByText("Child Text")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<AppButton label="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("passes props to the underlying Button", () => {
    render(<AppButton label="Test" color="secondary" data-testid="my-btn" />);
    const btn = screen.getByTestId("my-btn");
    expect(btn).toHaveClass("MuiButton-root");
  });
});
