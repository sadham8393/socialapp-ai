import { render, screen } from "@testing-library/react";
import AppTooltip from "../../src/components/AppTooltip";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("AppTooltip", () => {
  it("renders children and shows tooltip title on hover", async () => {
    render(
      <AppTooltip title="Tooltip text">
        <button>Hover me</button>
      </AppTooltip>
    );
    const button = screen.getByRole("button", { name: "Hover me" });
    expect(button).toBeInTheDocument();
    await userEvent.hover(button);
    // Tooltip text should appear after hover
    expect(await screen.findByText("Tooltip text")).toBeInTheDocument();
  });

  it("does not show tooltip if title is empty", async () => {
    render(
      <AppTooltip title="">
        <button>No tooltip</button>
      </AppTooltip>
    );
    const button = screen.getByRole("button", { name: "No tooltip" });
    expect(button).toBeInTheDocument();
    await userEvent.hover(button);
    // Tooltip should not appear
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
