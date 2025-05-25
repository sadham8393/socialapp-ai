import React, { useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppTextField from "../../components/AppTextField";
import { PERSONAL_INFO_FIELDS } from "./constants";
import AppTooltip from "../../components/AppTooltip";
import { useStates } from "../../hooks/useStates";

interface PersonalInfoFormProps {
  countries: { name: string; code: string }[];
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ countries }) => {
    const { t } = useTranslation();
    const form = useFormContext<FieldValues>();
    const [selectedCountry, setSelectedCountry] = useState("");
    const states = useStates(selectedCountry, countries);

    if (!form) return null;
    const { control, formState: { errors } } = form;

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {PERSONAL_INFO_FIELDS.map(fieldConfig => {
                return (
                    <Controller
                        key={fieldConfig.name}
                        name={fieldConfig.name}
                        control={control}
                        rules={{
                            ...(fieldConfig.name !== "state" && { required: t(fieldConfig.requiredMsg) }),
                            ...(fieldConfig.pattern ? { pattern: { value: fieldConfig.pattern.value, message: t(fieldConfig.pattern.message) } } : {}),
                        }}
                        render={({ field }) => {
                            const labelWithInfo = t(fieldConfig.label);
                            if (fieldConfig.name === "country") {
                                return (
                                    <AppTextField
                                        {...field}
                                        label={labelWithInfo}
                                        required
                                        select
                                        fullWidth
                                        slotProps={{ input: { "aria-label": t(fieldConfig.label) } }}
                                        error={!!errors[fieldConfig.name]}
                                        helperText={errors[fieldConfig.name]?.message as string}
                                        value={field.value || ""}
                                        onChange={e => {
                                            field.onChange(e);
                                            setSelectedCountry(e.target.value);
                                        }}
                                    >
                                        <MenuItem value="">{t("select")}</MenuItem>
                                        {countries.map(c => (
                                            <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                                        ))}
                                    </AppTextField>
                                );
                            }
                            if (fieldConfig.name === "state") {
                                if (states.length > 0) {
                                    return (
                                        <AppTextField
                                            {...field}
                                            label={labelWithInfo}
                                            select
                                            fullWidth
                                            slotProps={{ input: { "aria-label": t(fieldConfig.label) } }}
                                            error={!!errors[fieldConfig.name]}
                                            helperText={errors[fieldConfig.name]?.message as string}
                                            value={field.value || ""}
                                            disabled={!selectedCountry}
                                        >
                                            <MenuItem value="">{t("select")}</MenuItem>
                                            {states.map(s => (
                                                <MenuItem key={s} value={s}>{s}</MenuItem>
                                            ))}
                                        </AppTextField>
                                    );
                                } else {
                                    return (
                                        <AppTextField
                                            {...field}
                                            label={labelWithInfo}
                                            fullWidth
                                            slotProps={{ input: { "aria-label": t(fieldConfig.label) } }}
                                            error={!!errors[fieldConfig.name]}
                                            helperText={errors[fieldConfig.name]?.message as string}
                                            value={field.value || ""}
                                        />
                                    );
                                }
                            }
                            return fieldConfig.type === "select" ? (
                                <AppTextField
                                    {...field}
                                    label={labelWithInfo}
                                    required
                                    select
                                    fullWidth
                                    slotProps={{ input: { "aria-label": t(fieldConfig.label) } }}
                                    error={!!errors[fieldConfig.name]}
                                    helperText={errors[fieldConfig.name]?.message as string}
                                >
                                    {fieldConfig.options?.map(opt => (
                                        <MenuItem key={opt.value} value={opt.value}>{t(opt.label)}</MenuItem>
                                    ))}
                                </AppTextField>
                            ) : (
                                <AppTooltip title={fieldConfig.info || ""}>
                                    <div>
                                        <AppTextField
                                            {...field}
                                            label={labelWithInfo}
                                            type={fieldConfig.type}
                                            required
                                            fullWidth
                                            slotProps={{ input: { "aria-label": t(fieldConfig.label), ...(fieldConfig.inputLabelShrink ? {} : {}), ...(fieldConfig.name === "dob" ? { placeholder: t("dateOfBirthPlaceholder") } : {}) }, inputLabel: fieldConfig.name === "dob" ? { shrink: true } : {} }}
                                            error={!!errors[fieldConfig.name]}
                                            helperText={errors[fieldConfig.name]?.message as string}
                                        />
                                    </div>
                                </AppTooltip>
                            );
                        }}
                    />
                );
            })}
        </Box>
    );
};

export default PersonalInfoForm;
