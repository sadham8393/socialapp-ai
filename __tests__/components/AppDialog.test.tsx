import { render, screen } from "@testing-library/react";
import AppDialog from "../../src/components/AppDialog";
import React from "react";
import { Button } from "@mui/material";

describe("AppDialog", () => {
  it("renders title, children, and actions", () => {
    render(
      <AppDialog
        open={true}
        title="Dialog Title"
        actions={<Button>OK</Button>}
        onClose={() => {}}
      >
        <div>Dialog Content</div>
      </AppDialog>
    );
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("does not render actions if not provided", () => {
    render(
      <AppDialog open={true} title="No Actions" onClose={() => {}}>
        <div>No actions content</div>
      </AppDialog>
    );
    expect(screen.getByText("No Actions")).toBeInTheDocument();
    expect(screen.getByText("No actions content")).toBeInTheDocument();
    // DialogActions should not be in the document
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
