import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import SocialFormWizard from "../../../src/pages/SocialFormWizard";
import i18n from "../../../src/i18n"; // Import your i18n instance

// Mock the i18n.dir method
i18n.dir = jest.fn().mockReturnValue("ltr");

const countries = [
    { name: "Egypt", code: "EG" },
    { name: "United States", code: "US" },
];

function Wrapper({ children }: { children: React.ReactNode }) {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

describe("SocialFormWizard", () => {
    it("renders stepper and first step", () => {
        render(
            <Wrapper>
                <SocialFormWizard countries={countries} />
            </Wrapper>
        );

        expect(screen.getByRole("progressbar")).toBeInTheDocument();

        // Use getAllByLabelText to handle multiple matches
        const fullNameInputs = screen.getAllByLabelText(/full name/i);
        expect(fullNameInputs[0]).toBeInTheDocument(); // Ensure the first matching input is rendered
        expect(fullNameInputs[0].tagName).toBe("INPUT"); // Verify it's an input element
    });

    /* it("navigates to the next step on next button click", async () => {
        render(
            <Wrapper>
                <SocialFormWizard countries={countries} />
            </Wrapper>
        );

        const nextButton = screen.getByRole("button", { name: /next/i });

        // Click the "Next" button to move to Step 2
        fireEvent.click(nextButton);

        // Wait for the second step's header text (or any unique marker)
        await waitFor(() => {
            expect(screen.getByText(/family & financial info/i)).toBeInTheDocument();
        });

        // Try to find the "Employment Circumstances" input field using a more robust query
        let employmentField;
        await waitFor(() => {
            employmentField = screen.getByRole("textbox", { name: /employment circumstances/i });
            expect(employmentField).toBeInTheDocument();
        });
    }); */


    /* it("navigates back to the previous step on back button click", async () => {
      render(
        <Wrapper>
          <SocialFormWizard countries={countries} />
        </Wrapper>
      );
  
      const nextButton = screen.getByRole("button", { name: /next/i });
      fireEvent.click(nextButton);
  
      // Wait for the next step to render
      await waitFor(() => {
        expect(screen.getByLabelText(/employment circumstances/i)).toBeInTheDocument();
      });
  
      const backButton = screen.getByRole("button", { name: /back/i });
      fireEvent.click(backButton);
  
      // Wait for the previous step to render
      await waitFor(() => {
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      });
    }); */

    /* it("submits the form after completing all steps", async () => {
      render(
        <Wrapper>
          <SocialFormWizard countries={countries} />
        </Wrapper>
      );
  
      // Fill out the first step
      fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/national id/i), { target: { value: "123456789" } });
      fireEvent.click(screen.getByRole("button", { name: /next/i }));
  
      // Fill out the second step
      await waitFor(() => {
        expect(screen.getByLabelText(/employment circumstances/i)).toBeInTheDocument();
      });
      fireEvent.change(screen.getByLabelText(/employment circumstances/i), { target: { value: "Employed" } });
      fireEvent.click(screen.getByRole("button", { name: /next/i }));
  
      // Fill out the third step
      await waitFor(() => {
        expect(screen.getByLabelText(/reason for applying/i)).toBeInTheDocument();
      });
      fireEvent.change(screen.getByLabelText(/reason for applying/i), { target: { value: "Financial support" } });
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
      // Verify form submission
      await waitFor(() => {
        expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument(); // Example success message
      });
    }); */
});