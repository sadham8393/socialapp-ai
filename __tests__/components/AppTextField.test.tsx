import { fireEvent, render, screen } from "@testing-library/react";
import AppTextField from "../../src/components/AppTextField";

describe("AppTextField", () => {
  it("renders with the correct label", () => {
    render(<AppTextField label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<AppTextField label="Email" onChange={handleChange} />);
    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with the correct type and value", () => {
    render(<AppTextField label="Password" type="password" value="secret" onChange={() => {}} />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveValue("secret");
  });
});
