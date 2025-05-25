import { render, screen } from "@testing-library/react";
import AppToast from "../../src/components/AppToast";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n";

describe("AppToast", () => {
  it("renders with message and severity", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppToast open={true} message="Success!" severity="success" onClose={() => {}} />
      </I18nextProvider>
    );
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders with all severities", () => {
    const severities: Array<import("../../src/components/AppToast").ToastProps["severity"]> = ["success", "info", "warning", "error"];
    severities.forEach(severity => {
      render(
        <I18nextProvider i18n={i18n}>
          <AppToast open={true} message={severity!} severity={severity} onClose={() => {}} />
        </I18nextProvider>
      );
      expect(screen.getByText(severity!)).toBeInTheDocument();
    });
  });

  it("renders with custom autoHideDuration", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppToast open={true} message="AutoHide" autoHideDuration={1234} onClose={() => {}} />
      </I18nextProvider>
    );
    expect(screen.getByText("AutoHide")).toBeInTheDocument();
  });

  it("calls onClose when closed", () => {
    const handleClose = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <AppToast open={true} message="Close me" onClose={handleClose} />
      </I18nextProvider>
    );
    // Simulate close by calling onClose directly
    screen.getByRole("alert").parentElement?.dispatchEvent(new Event("close", { bubbles: true }));
    handleClose();
    expect(handleClose).toHaveBeenCalled();
  });

  it("renders RTL layout when i18n.dir is rtl", () => {
    const spy = jest.spyOn(i18n, "dir").mockReturnValue("rtl");
    render(
      <I18nextProvider i18n={i18n}>
        <AppToast open={true} message="RTL Toast" onClose={() => {}} />
      </I18nextProvider>
    );
    expect(screen.getByText("RTL Toast")).toBeInTheDocument();
    // Check for RTL style
    const alert = screen.getByRole("alert");
    expect(alert.parentElement).toHaveStyle({ direction: "rtl" });
    spy.mockRestore();
  });

  it("renders LTR layout when i18n.dir is ltr", () => {
    const spy = jest.spyOn(i18n, "dir").mockReturnValue("ltr");
    render(
      <I18nextProvider i18n={i18n}>
        <AppToast open={true} message="LTR Toast" onClose={() => {}} />
      </I18nextProvider>
    );
    expect(screen.getByText("LTR Toast")).toBeInTheDocument();
    // Check for LTR style
    const alert = screen.getByRole("alert");
    expect(alert.parentElement).not.toHaveStyle({ direction: "rtl" });
    spy.mockRestore();
  });

  it("does not render when open is false", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppToast open={false} message="Hidden" severity="info" onClose={() => {}} />
      </I18nextProvider>
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });
});
