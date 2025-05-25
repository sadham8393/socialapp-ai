import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import i18n from "../../../src/i18n";
import SituationDescriptionsForm from "../../../src/pages/SocialFormWizard/SituationDescriptionsForm";
import { useDispatch } from "react-redux";
import { SITUATION_DESCRIPTIONS_FIELDS } from "../../../src/pages/SocialFormWizard/constants";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));

const mockStore = configureMockStore();
const store = mockStore({
    aiSuggestion: { loading: false, error: null, suggestion: "" }, // Mock the initial state of the Redux store
});

const defaultValues = Object.fromEntries(
    SITUATION_DESCRIPTIONS_FIELDS.map(f => [f.name, ""])
);

function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm({ defaultValues });
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <FormProvider {...methods}>
                    <form role="form">{children}</form>
                </FormProvider>
            </I18nextProvider>
        </Provider>
    );
}

describe("SituationDescriptionsForm", () => {
    it("renders all description fields", () => {
        render(
            <Wrapper>
                <SituationDescriptionsForm />
            </Wrapper>
        );

        SITUATION_DESCRIPTIONS_FIELDS.forEach(field => {
            const label = i18n.t(field.label);
            expect(screen.getByLabelText(label)).toBeInTheDocument();
        });
    });

    it("dispatches the correct actions when Help Me Write is clicked", () => {
        const mockDispatch = jest.fn();
        ((useDispatch as unknown) as jest.Mock).mockReturnValue(mockDispatch);

        render(
            <Wrapper>
                <SituationDescriptionsForm />
            </Wrapper>
        );

        const helpMeWriteButtons = screen.getAllByRole("button", { name: i18n.t("helpMeWrite") });

        const firstHelpMeWriteButton = helpMeWriteButtons[0];

        fireEvent.click(firstHelpMeWriteButton);

        expect(mockDispatch).toHaveBeenCalledTimes(2);

        expect(mockDispatch).toHaveBeenNthCalledWith(1, {
            type: "aiSuggestion/clearSuggestion",
            payload: undefined,
        });

        // Check the second dispatched action
        expect(mockDispatch).toHaveBeenNthCalledWith(2, {
            type: "aiSuggestion/fetch",
            payload: "Please write a brief description of my current financial situation for a government social support application.",
        });
    });
});