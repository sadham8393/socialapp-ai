import React from "react";
import { Box, MenuItem } from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppTextField from "../../components/AppTextField";

const FamilyFinancialInfoForm: React.FC = () => {
    const { t } = useTranslation();
    const form = useFormContext<FieldValues>();
    if (!form) return null;
    const { control, formState: { errors } } = form;
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Controller
                name="maritalStatus"
                control={control}
                rules={{ required: t("maritalStatusIsRequired") }}
                render={({ field }) => (
                    <AppTextField {...field} label={t("maritalStatus")}
                        required select fullWidth slotProps={{ input: { "aria-label": t("maritalStatus") } }}
                        error={!!errors.maritalStatus} helperText={errors.maritalStatus?.message as string}>
                        <MenuItem value="">{t("select")}</MenuItem>
                        <MenuItem value="single">{t("single")}</MenuItem>
                        <MenuItem value="married">{t("married")}</MenuItem>
                        <MenuItem value="divorced">{t("divorced")}</MenuItem>
                        <MenuItem value="widowed">{t("widowed")}</MenuItem>
                    </AppTextField>
                )}
            />
            <Controller
                name="dependents"
                control={control}
                rules={{ required: t("numberOfDependentsIsRequired"), min: { value: 0, message: t("cannotBeNegative") } }}
                render={({ field }) => (
                    <AppTextField {...field} label={t("dependents")} type="number" required fullWidth slotProps={{ input: { "aria-label": t("dependents") } }} error={!!errors.dependents} helperText={errors.dependents?.message as string} />
                )}
            />
            <Controller
                name="employmentStatus"
                control={control}
                rules={{ required: t("employmentStatusIsRequired") }}
                render={({ field }) => (
                    <AppTextField {...field} label={t("employmentStatus")} required select fullWidth slotProps={{ input: { "aria-label": t("employmentStatus") } }} error={!!errors.employmentStatus} helperText={errors.employmentStatus?.message as string}>
                        <MenuItem value="">{t("select")}</MenuItem>
                        <MenuItem value="employed">{t("employed")}</MenuItem>
                        <MenuItem value="unemployed">{t("unemployed")}</MenuItem>
                        <MenuItem value="student">{t("student")}</MenuItem>
                        <MenuItem value="retired">{t("retired")}</MenuItem>
                    </AppTextField>
                )}
            />
            <Controller
                name="monthlyIncome"
                control={control}
                rules={{ required: t("monthlyIncomeIsRequired"), min: { value: 0, message: t("cannotBeNegative") } }}
                render={({ field }) => (
                    <AppTextField
                        {...field}
                        label={t("monthlyIncome")}
                        type="number"
                        required
                        fullWidth
                        slotProps={{ input: { "aria-label": t("monthlyIncome") } }}
                        error={!!errors.monthlyIncome}
                        helperText={errors.monthlyIncome?.message as string}
                    />
                )}
            />
            <Controller
                name="housingStatus"
                control={control}
                rules={{ required: t("housingStatusIsRequired") }}
                render={({ field }) => (
                    <AppTextField
                        {...field}
                        label={t("housingStatus")}
                        required
                        select
                        fullWidth
                        slotProps={{ input: { "aria-label": t("housingStatus") } }}
                        error={!!errors.housingStatus}
                        helperText={errors.housingStatus?.message as string}
                    >
                        <MenuItem value="">{t("select")}</MenuItem>
                        <MenuItem value="own">{t("own")}</MenuItem>
                        <MenuItem value="rent">{t("rent")}</MenuItem>
                        <MenuItem value="family">{t("family")}</MenuItem>
                        <MenuItem value="other">{t("other")}</MenuItem>
                    </AppTextField>
                )}
            />
        </Box>
    );
};

export default FamilyFinancialInfoForm;
