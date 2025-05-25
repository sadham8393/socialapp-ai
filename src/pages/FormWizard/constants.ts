// Step labels for the form wizard, using translations
// Accepts a translation function (t: (key: string) => string) as argument
export const getFormSteps = (t: (key: string) => string) => [
  t("personalInformation"),
  t("familyFinancialInfo"),
  t("situationDescriptions"),
];
