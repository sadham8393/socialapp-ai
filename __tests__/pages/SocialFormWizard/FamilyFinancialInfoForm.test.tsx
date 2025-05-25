import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import i18n from "../../../src/i18n";
import FamilyFinancialInfoForm from "../../../src/pages/SocialFormWizard/FamilyFinancialInfoForm";
import { FAMILY_FINANCIAL_FIELDS } from "../../../src/pages/SocialFormWizard/constants";

const defaultValues = Object.fromEntries(
    FAMILY_FINANCIAL_FIELDS.map(f => [f.name, f.type === "select" ? "" : ""])
);

function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm({ defaultValues });
    return (
        <I18nextProvider i18n={i18n}>
            <FormProvider {...methods}>
                <form role="form">{children}</form>
            </FormProvider>
        </I18nextProvider>
    );
}

describe("FamilyFinancialInfoForm", () => {
    it("renders all fields", () => {
        render(
            <Wrapper>
                <FamilyFinancialInfoForm />
            </Wrapper>
        );

        FAMILY_FINANCIAL_FIELDS.forEach(field => {
            const label = i18n.t(field.label);
            expect(screen.getByLabelText(label)).toBeInTheDocument();
        });
    });
});