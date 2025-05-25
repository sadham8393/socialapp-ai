import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AppHeader from "../../src/components/AppHeader";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n";

describe("AppHeader", () => {
    it("renders the main title and portal subtitle", () => {
        render(
            <I18nextProvider i18n={i18n}>
                <AppHeader />
            </I18nextProvider>
        );
        expect(screen.getByText(/social support application/i)).toBeInTheDocument();
        expect(screen.getByText(/government portal/i)).toBeInTheDocument();
    });

    it("shows the language dropdown", () => {
        render(
            <I18nextProvider i18n={i18n}>
                <AppHeader />
            </I18nextProvider>
        );
        expect(screen.getByLabelText(i18n.t("selectLanguage"))).toBeInTheDocument();
    });

    it("calls i18n.changeLanguage when language is changed", () => {
        const spy = jest.spyOn(i18n, "changeLanguage");
        render(
            <I18nextProvider i18n={i18n}>
                <AppHeader />
            </I18nextProvider>
        );
        const select = screen.getByLabelText(i18n.t("selectLanguage"));
        // Change to Arabic
        select.focus();
        fireEvent.change(select, { target: { value: "ar" } });
        expect(spy).toHaveBeenCalledWith("ar");
        spy.mockRestore();
    });
});
