import React from "react";
import { Box, MenuItem } from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppTextField from "../../components/AppTextField";

const PersonalInfoForm: React.FC = () => {
  const { t } = useTranslation();
  const form = useFormContext<FieldValues>();
  if (!form) return null;
  const { control, formState: { errors } } = form;
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Controller
        name="name"
        control={control}
        rules={{ required: t("fullNameIsRequired") }}
        render={({ field }) => (
          <AppTextField {...field} label={t("fullName")} required fullWidth slotProps={{ input: { "aria-label": t("fullName") } }} error={!!errors.name} helperText={errors.name?.message as string} />
        )}
      />
      <Controller
        name="nationalId"
        control={control}
        rules={{ required: t("nationalIdIsRequired"), pattern: { value: /^\d{10,20}$/, message: t("enterAValidNationalId") } }}
        render={({ field }) => (
          <AppTextField {...field} label={t("nationalId")} required fullWidth slotProps={{ input: { "aria-label": t("nationalId") } }} error={!!errors.nationalId} helperText={errors.nationalId?.message as string} />
        )}
      />
      <Controller
        name="dob"
        control={control}
        rules={{ required: t("dateOfBirthIsRequired") }}
        render={({ field }) => (
          <AppTextField {...field} label={t("dateOfBirth")} type="date" required fullWidth slotProps={{ input: { "aria-label": t("dateOfBirth") }, inputLabel: { shrink: true } }} error={!!errors.dob} helperText={errors.dob?.message as string} />
        )}
      />
      <Controller
        name="gender"
        control={control}
        rules={{ required: t("genderIsRequired") }}
        render={({ field }) => (
          <AppTextField {...field} label={t("gender")} required select fullWidth slotProps={{ input: { "aria-label": t("gender") } }} error={!!errors.gender} helperText={errors.gender?.message as string}>
            <MenuItem value="">{t("select")}</MenuItem>
            <MenuItem value="male">{t("male")}</MenuItem>
            <MenuItem value="female">{t("female")}</MenuItem>
            <MenuItem value="other">{t("other")}</MenuItem>
          </AppTextField>
        )}
      />
      <Controller
        name="address"
        control={control}
        rules={{ required: t("addressIsRequired") }}
        render={({ field }) => (
          <AppTextField {...field} label={t("address")} required fullWidth slotProps={{ input: { "aria-label": t("address") } }} error={!!errors.address} helperText={errors.address?.message as string} />
        )}
      />
      <Box display="flex" gap={2}>
        <Controller
          name="city"
          control={control}
          rules={{ required: t("cityIsRequired") }}
          render={({ field }) => (
            <AppTextField {...field} label={t("city")} required fullWidth slotProps={{ input: { "aria-label": t("city") } }} error={!!errors.city} helperText={errors.city?.message as string} />
          )}
        />
        <Controller
          name="state"
          control={control}
          rules={{ required: t("stateIsRequired") }}
          render={({ field }) => (
            <AppTextField {...field} label={t("state")} required fullWidth slotProps={{ input: { "aria-label": t("state") } }} error={!!errors.state} helperText={errors.state?.message as string} />
          )}
        />
      </Box>
      <Controller
        name="country"
        control={control}
        rules={{ required: t("countryIsRequired") }}
        render={({ field }) => (
          <AppTextField {...field} label={t("country")} required fullWidth slotProps={{ input: { "aria-label": t("country") } }} error={!!errors.country} helperText={errors.country?.message as string} />
        )}
      />
      <Controller
        name="phone"
        control={control}
        rules={{ required: t("phoneIsRequired"), pattern: { value: /^\+?\d{7,15}$/, message: t("enterAValidPhoneNumber") } }}
        render={({ field }) => (
          <AppTextField {...field} label={t("phone")} required fullWidth slotProps={{ input: { "aria-label": t("phone") } }} error={!!errors.phone} helperText={errors.phone?.message as string} />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: t("emailIsRequired"), pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: t("enterAValidEmailAddress") } }}
        render={({ field }) => (
          <AppTextField {...field} label={t("email")} type="email" required fullWidth slotProps={{ input: { "aria-label": t("email") } }} error={!!errors.email} helperText={errors.email?.message as string} />
        )}
      />
    </Box>
  );
};

export default PersonalInfoForm;
