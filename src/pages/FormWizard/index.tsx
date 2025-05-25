import { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getFormStepConfigs } from "./formStepConfigs";
import AppButton from "../../components/AppButton";

// Initial form values
const initialForm = {
  name: "",
  nationalId: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",
  info1: "",
  info2: "",
  info3: "",
};

function FormWizard() {
  const [step, setStep] = useState(0);
  const methods = useForm<FieldValues>({ defaultValues: initialForm, mode: "onTouched" });
  const { reset, getValues, handleSubmit, trigger, formState } = methods;
  const { t, i18n } = useTranslation();
  const FORM_STEP_CONFIGS = getFormStepConfigs(i18n.t);

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
        py={4}
        aria-label="Application Form Wizard"
        role="form"
        tabIndex={0}
        aria-live="polite"
      >
        <Paper elevation={3} sx={{
          width: "100%", maxWidth: 500, p: 3,

          "& .MuiStepConnector-root": {
            left: i18n.dir() === "rtl" ? "calc(50% + 20px)" : "calc(-50% + 20px)",
            right: i18n.dir() === "rtl" ? "calc(-50% + 20px)" : "calc(50% + 20px)",
          }
        }}>
          <Stepper
            activeStep={step}
            alternativeLabel
            sx={{ mb: 4 }}
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
            <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
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
        </Paper>
      </Box>
    </FormProvider>
  );
}

export default FormWizard;
