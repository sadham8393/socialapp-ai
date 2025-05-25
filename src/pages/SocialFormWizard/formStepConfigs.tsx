import PersonalInfoForm from "./PersonalInfoForm";
import FamilyFinancialInfoForm from "./FamilyFinancialInfoForm";
import SituationDescriptionsForm from "./SituationDescriptionsForm";
import { getFormSteps } from "./constants";

// Remove useTranslation from this file. Instead, export a function to get step configs with t injected.

export const getFormStepConfigs = (
  t: (key: string) => string,
  countries: { name: string; code: string }[]
) => {
  const formSteps = getFormSteps(t);
  return [
    {
      label: formSteps[0],
      component: <PersonalInfoForm countries={countries} />,
    },
    {
      label: formSteps[1],
      component: <FamilyFinancialInfoForm />,
    },
    {
      label: formSteps[2],
      component: <SituationDescriptionsForm />,
    },
    // Add more steps here as needed
  ];
};
