import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getFormStepConfigs } from "./formStepConfigs";
import AppButton from "../../components/AppButton";
import Toast from "../../components/AppToast";

// Initial form values type
export type FormValues = {
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

const initialForm: FormValues = {
  name: "",
  nationalId: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  currentFinancialSituation: "",
  employmentCircumstances: "",
  reasonForApplying: "",
};

interface SocialFormWizardProps {
  countries: { name: string; code: string }[];
}

const SocialFormWizard: React.FC<SocialFormWizardProps> = ({ countries }) => {
  const [step, setStep] = useState<number>(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const methods = useForm<FormValues>({ defaultValues: initialForm, mode: "onTouched" });
  const { reset, getValues, handleSubmit, trigger, formState } = methods;
  const { t, i18n } = useTranslation();
  const FORM_STEP_CONFIGS: { label: string; component: React.ReactNode }[] = getFormStepConfigs(t, countries);

  // Load saved form progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("form-progress");
    if (saved) {
      const { step, form } = JSON.parse(saved);
      setStep(step);
      reset(form);
    }
  }, [reset]);

  // Save form progress to localStorage on step or form change
  useEffect(() => {
    localStorage.setItem("form-progress", JSON.stringify({ step, form: getValues() }));
  }, [step, getValues]);

  // Navigate to the next step
  const nextStep = () => setStep((s) => Math.min(s + 1, FORM_STEP_CONFIGS.length - 1));
  // Navigate to the previous step
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Handle form submission
  const onSubmit = () => {
    setToastMsg(t("form_submitted_successfully"));
    setToastOpen(true);
    setTimeout(() => {
      localStorage.removeItem("form-progress");
      reset(initialForm);
      setStep(0);
    }, 800);
  };

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        py={{ xs: 2, sm: 4 }}
        px={{ xs: 0.5, sm: 0 }}
        width="100%"
        aria-label="Application Form Wizard"
        role="form"
        tabIndex={0}
        aria-live="polite"
      >
        <Paper
          elevation={3}
          sx={{
            width: { xs: "100%", sm: "75%" },
            maxWidth: "100%",
            p: { xs: 1, sm: 3 },
            boxSizing: "border-box",
            mx: { xs: 0, sm: "auto" },
            borderRadius: { xs: 0, sm: 2 },
            minHeight: { xs: "auto", sm: 500 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "@media (max-width: 600px)": {
              minHeight: "unset",
              p: 1,
              borderRadius: 0,
              width: "100%",
            },
            "& .MuiStepConnector-root": {
              left: i18n.dir() === "rtl" ? "calc(50% + 20px)" : "calc(-50% + 20px)",
              right: i18n.dir() === "rtl" ? "calc(-50% + 20px)" : "calc(50% + 20px)",
            },
          }}
        >
          <Stepper
            activeStep={step}
            alternativeLabel={window.innerWidth >= 600}
            orientation={window.innerWidth < 600 ? "vertical" : "horizontal"}
            sx={{
              mb: 4,
              width: "100%",
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                whiteSpace: "pre-line",
                textAlign: "center",
              },
              "& .MuiStepIcon-root": {
                fontSize: { xs: 20, sm: 24 },
              },
            }}
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={FORM_STEP_CONFIGS.length}
            aria-label="Step"
          >
            {FORM_STEP_CONFIGS.map((stepObj, idx) => (
              <Step key={stepObj.label} completed={step > idx} aria-current={step === idx ? "step" : undefined}>
                <StepLabel tabIndex={0}>{stepObj.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title">
            <h2 id="form-title" style={{ position: "absolute", left: "-9999px" }}>
              {FORM_STEP_CONFIGS[step].label}
            </h2>
            {FORM_STEP_CONFIGS[step].component}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              mt={4}
              gap={2}
            >
              <AppButton
                variant="outlined"
                onClick={prevStep}
                disabled={step === 0}
                color="secondary"
                aria-label={t("back")}
                tabIndex={0}
                type="button"
                label={t("back")}
              />
              {(step < FORM_STEP_CONFIGS.length - 1) && (
                <AppButton
                  variant="contained"
                  onClick={async () => {
                    const valid = await trigger();
                    if (valid) nextStep();
                  }}
                  color="primary"
                  aria-label={t("next")}
                  tabIndex={0}
                  type="button"
                  disabled={!formState.isValid}
                  label={t("next")}
                />
              )}
              {(step === FORM_STEP_CONFIGS.length - 1) && (
                <AppButton
                  variant="contained"
                  type="submit"
                  color="success"
                  aria-label={t("submit")}
                  tabIndex={0}
                  label={t("submit")}
                />
              )}
            </Box>
          </form>
          <Toast
            open={toastOpen}
            message={toastMsg}
            severity="success"
            onClose={() => setToastOpen(false)}
          />
        </Paper>
      </Box>
    </FormProvider>
  );
}

export default SocialFormWizard;
