import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import PersonalInfoForm from "../../../src/pages/SocialFormWizard/PersonalInfoForm";
import { PERSONAL_INFO_FIELDS } from "../../../src/pages/SocialFormWizard/constants";
import userEvent from "@testing-library/user-event";
import i18n from "../../../src/i18n";
import { I18nextProvider } from "react-i18next";

// Mock useStates to always return states for Egypt
jest.mock("../../../src/hooks/useStates", () => ({
	useStates: (selectedCountry: string) =>
		selectedCountry === "EG" ? ["Cairo", "Giza"] : [],
}));

const countries = [
	{ name: "Egypt", code: "EG" },
	{ name: "United States", code: "US" },
];

const defaultValues = Object.fromEntries(
	PERSONAL_INFO_FIELDS.map(f => [f.name, f.type === "select" ? "" : ""])
);

let lastMethods: ReturnType<typeof useForm> | undefined;
function Wrapper({ children }: { children: React.ReactNode }) {
	const methods = useForm({ defaultValues });
	lastMethods = methods;
	return (
		<I18nextProvider i18n={i18n}>
			<FormProvider {...methods}>
				<form role="form">{children}</form>
			</FormProvider>
		</I18nextProvider>
	);
}

const errorMessages = {
	fullName: i18n.t("fullNameIsRequired"),
	nationalId: i18n.t("nationalIdIsRequired"),
	dateOfBirth: i18n.t("dateOfBirthIsRequired"),
	gender: i18n.t("genderIsRequired"),
	address: i18n.t("addressIsRequired"),
	country: i18n.t("countryIsRequired"),
	phone: i18n.t("phoneIsRequired"),
	email: i18n.t("emailIsRequired"),
	city: i18n.t("cityIsRequired"),
	state: i18n.t("stateIsRequired"),
};

describe("PersonalInfoForm", () => {
	it("renders all fields and country select", () => {
		render(
			<Wrapper>
				<PersonalInfoForm countries={countries} />
			</Wrapper>
		);
		PERSONAL_INFO_FIELDS.forEach(field => {
			// Use translated label
			const label = i18n.t(field.label);
			expect(screen.getAllByLabelText(label).length).toBeGreaterThan(0);
		});
		expect(screen.getByRole("combobox", { name: i18n.t("country") })).toBeInTheDocument();
	});

	it("shows state select when country is selected", async () => {
		render(
			<Wrapper>
				<PersonalInfoForm countries={countries} />
			</Wrapper>
		);
		const countrySelect = screen.getByRole("combobox", { name: i18n.t("country") });
		await userEvent.click(countrySelect);
		const egyptOption = await screen.findByRole("option", { name: "Egypt" });
		await userEvent.click(egyptOption);
		await waitFor(() => {
			expect(screen.getByRole("combobox", { name: i18n.t("state") })).toBeInTheDocument();
		});
	});

	it("shows validation error when required fields are empty and form is submitted", async () => {
		render(
			<Wrapper>
				<PersonalInfoForm countries={countries} />
			</Wrapper>
		);
		fireEvent.submit(screen.getByRole("form"));
		await lastMethods?.trigger();
		// Wait for at least one error helper text to appear
		const errorEls = await screen.findAllByText(
			(content) => typeof content === "string" && Object.values(errorMessages).some(msg => content.includes(msg)),
			{ selector: ".MuiFormHelperText-root" }
		);
		expect(errorEls.length).toBeGreaterThan(0);
		// Assert that the 'Full name is required.' error is present
		expect(screen.getByText((content) =>
			typeof content === "string" && content.includes(errorMessages.fullName),
			{ selector: ".MuiFormHelperText-root" }
		)).toBeInTheDocument();
	});

	it("accepts input and updates value", async () => {
		render(
			<Wrapper>
				<PersonalInfoForm countries={countries} />
			</Wrapper>
		);
		const nameInput = screen.getByRole("textbox", { name: i18n.t("fullName") });
		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		expect(nameInput).toHaveValue("John Doe");
	});

	it("shows pattern error for invalid email", async () => {
		render(
			<Wrapper>
				<PersonalInfoForm countries={countries} />
			</Wrapper>
		);
		const emailInput = screen.getByRole("textbox", { name: i18n.t("email") });
		fireEvent.change(emailInput, { target: { value: "not-an-email" } });
		fireEvent.submit(screen.getByRole("form"));
		await lastMethods?.trigger();
		// Wait for error helper text
		const errorEl = await screen.findByText(
			(content) => typeof content === "string" && content.toLowerCase().includes("valid"),
			{ selector: ".MuiFormHelperText-root" }
		);
		expect(errorEl).toBeInTheDocument();
	});
});
