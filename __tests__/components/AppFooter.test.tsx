import { render, screen } from "@testing-library/react";
import AppFooter from "../../src/components/AppFooter";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n";

describe("AppFooter", () => {
    it("renders the footer copyright", () => {
        render(
            <I18nextProvider i18n={i18n}>
                <AppFooter />
            </I18nextProvider>
        );
        expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    });
});
