// Step labels for the form wizard, using translations
// Accepts a translation function (t: (key: string) => string) as argument
export const getFormSteps = (t: (key: string) => string) => [
  t("personalInformation"),
  t("familyFinancialInfo"),
  t("situationDescriptions"),
];

// Family financial information fields configuration
export const FAMILY_FINANCIAL_FIELDS = [
  {
    name: "maritalStatus",
    label: "maritalStatus",
    requiredMsg: "maritalStatusIsRequired",
    type: "select",
    options: [
      { value: "", label: "select" },
      { value: "single", label: "single" },
      { value: "married", label: "married" },
      { value: "divorced", label: "divorced" },
      { value: "widowed", label: "widowed" },
    ],
  },
  {
    name: "dependents",
    label: "dependents",
    requiredMsg: "numberOfDependentsIsRequired",
    type: "number",
    min: 0,
    minMsg: "cannotBeNegative",
  },
  {
    name: "employmentStatus",
    label: "employmentStatus",
    requiredMsg: "employmentStatusIsRequired",
    type: "select",
    options: [
      { value: "", label: "select" },
      { value: "employed", label: "employed" },
      { value: "unemployed", label: "unemployed" },
      { value: "student", label: "student" },
      { value: "retired", label: "retired" },
    ],
  },
  {
    name: "monthlyIncome",
    label: "monthlyIncome",
    requiredMsg: "monthlyIncomeIsRequired",
    type: "number",
    min: 0,
    minMsg: "cannotBeNegative",
  },
  {
    name: "housingStatus",
    label: "housingStatus",
    requiredMsg: "housingStatusIsRequired",
    type: "select",
    options: [
      { value: "", label: "select" },
      { value: "own", label: "own" },
      { value: "rent", label: "rent" },
      { value: "family", label: "family" },
      { value: "other", label: "other" },
    ],
  },
];

// Personal information fields configuration
export const PERSONAL_INFO_FIELDS = [
  {
    name: "name",
    label: "fullName",
    requiredMsg: "fullNameIsRequired",
    type: "text",
    info: "Enter your full legal name.",
  },
  {
    name: "nationalId",
    label: "nationalId",
    requiredMsg: "nationalIdIsRequired",
    type: "text",
    pattern: { value: /^\d{10,20}$/, message: "enterAValidNationalId" },
    info: "10-20 digits, numbers only.",
  },
  {
    name: "dob",
    label: "dateOfBirth",
    requiredMsg: "dateOfBirthIsRequired",
    type: "date",
    inputLabelShrink: true,
    info: "Format: dd-mm-yyyy.",
  },
  {
    name: "gender",
    label: "gender",
    requiredMsg: "genderIsRequired",
    type: "select",
    options: [
      { value: "", label: "select" },
      { value: "male", label: "male" },
      { value: "female", label: "female" },
      { value: "other", label: "other" },
    ],
    info: "Select your gender.",
  },
  {
    name: "address",
    label: "address",
    requiredMsg: "addressIsRequired",
    type: "text",
    info: "Enter your current address.",
  },
  {
    name: "country",
    label: "country",
    requiredMsg: "countryIsRequired",
    type: "text",
    info: "Enter your country.",
  },
  {
    name: "state",
    label: "state",
    requiredMsg: "stateIsRequired",
    type: "text",
    group: undefined, // Remove group so it appears in the main fields loop
    info: "Enter your state or province.",
  },
  {
    name: "city",
    label: "city",
    requiredMsg: "cityIsRequired",
    type: "text",
    group: "location",
    info: "Enter your city.",
  },
  {
    name: "phone",
    label: "phone",
    requiredMsg: "phoneIsRequired",
    type: "text",
    pattern: { value: /^\+?\d{7,15}$/, message: "enterAValidPhoneNumber" },
    info: "7-15 digits, may start with '+'.",
  },
  {
    name: "email",
    label: "email",
    requiredMsg: "emailIsRequired",
    type: "email",
    pattern: {
      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message: "enterAValidEmailAddress",
    },
    info: "Format: user@example.com.",
  },
];

// Situation descriptions fields configuration
export const SITUATION_DESCRIPTIONS_FIELDS = [
  {
    name: "currentFinancialSituation",
    label: "currentFinancialSituation",
    requiredMsg: "currentFinancialSituationIsRequired",
    type: "textarea",
    helpPrompt: "helpMeWritePromptCurrent",
  },
  {
    name: "employmentCircumstances",
    label: "employmentCircumstances",
    requiredMsg: "employmentCircumstancesIsRequired",
    type: "textarea",
    helpPrompt: "helpMeWritePromptEmployment",
  },
  {
    name: "reasonForApplying",
    label: "reasonForApplying",
    requiredMsg: "reasonForApplyingIsRequired",
    type: "textarea",
    helpPrompt: "helpMeWritePromptReason",
  },
];
