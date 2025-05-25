import React from "react";
import { Box, MenuItem } from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppTextField from "../../components/AppTextField";
import { FAMILY_FINANCIAL_FIELDS } from "./constants";

const FamilyFinancialInfoForm: React.FC = () => {
    const { t } = useTranslation();
    const form = useFormContext<FieldValues>();
    if (!form) return null;
    const { control, formState: { errors } } = form;

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {FAMILY_FINANCIAL_FIELDS.map(fieldConfig => (
                <Controller
                    key={fieldConfig.name}
                    name={fieldConfig.name}
                    control={control}
                    rules={{
                        required: t(fieldConfig.requiredMsg),
                        ...(fieldConfig.min !== undefined ? { min: { value: fieldConfig.min, message: t(fieldConfig.minMsg) } } : {}),
                    }}
                    render={({ field }) =>
                        fieldConfig.type === "select" ? (
                            <AppTextField
                                {...field}
                                label={t(fieldConfig.label)}
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
                            <AppTextField
                                {...field}
                                label={t(fieldConfig.label)}
                                type={fieldConfig.type}
                                required
                                fullWidth
                                slotProps={{ input: { "aria-label": t(fieldConfig.label), ...(fieldConfig.min !== undefined ? { min: fieldConfig.min } : {}) } }}
                                error={!!errors[fieldConfig.name]}
                                helperText={errors[fieldConfig.name]?.message as string}
                            />
                        )
                    }
                />
            ))}
        </Box>
    );
};

export default FamilyFinancialInfoForm;
