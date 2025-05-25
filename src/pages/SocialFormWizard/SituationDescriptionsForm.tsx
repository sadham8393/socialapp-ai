import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { clearSuggestion } from "../../redux/sagas/aiSuggestion";
import AppTextField from "../../components/AppTextField";
import AppDialog from "../../components/AppDialog";
import AppButton from "../../components/AppButton";
import type { AiSuggestionState } from "../../redux/sagas/aiSuggestion";
import { SITUATION_DESCRIPTIONS_FIELDS } from "./constants";
import { AI_SUGGESTION_FETCH } from "../../redux/constants";

const SituationDescriptionsForm: React.FC = () => {
  const { t } = useTranslation();
  const form = useFormContext<FieldValues>();
  const dispatch = useDispatch<AppDispatch>();
  const aiSuggestion = useSelector(
    (state: RootState) => state.aiSuggestion
  ) as AiSuggestionState;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogField, setDialogField] = useState<string | null>(null);

  if (!form) return null;
  const { control, setValue, formState: { errors } } = form;

  const handleHelpMeWrite = (field: string, prompt: string) => {
    setDialogField(field);
    setDialogOpen(true);
    dispatch(clearSuggestion());
    dispatch({ type: AI_SUGGESTION_FETCH, payload: prompt });
  };

  const handleAccept = () => {
    if (dialogField) setValue(dialogField, aiSuggestion.suggestion);
    setDialogOpen(false);
    setDialogField(null);
    dispatch(clearSuggestion());
  };

  const handleEdit = () => {
    if (dialogField) setValue(dialogField, aiSuggestion.suggestion);
    setDialogOpen(false);
    setDialogField(null);
    dispatch(clearSuggestion());
  };

  const handleClose = () => {
    setDialogOpen(false);
    setDialogField(null);
    dispatch(clearSuggestion());
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {SITUATION_DESCRIPTIONS_FIELDS.map(fieldConfig => (
        <Controller
          key={fieldConfig.name}
          name={fieldConfig.name}
          control={control}
          rules={{ required: t(fieldConfig.requiredMsg) }}
          render={({ field }) => (
            <Box>
              <AppTextField
                {...field}
                label={t(fieldConfig.label)}
                required
                fullWidth
                multiline
                minRows={2}
                slotProps={{ input: { "aria-label": t(fieldConfig.label) }, inputLabel: { shrink: !!field.value } }}
                error={!!errors[fieldConfig.name] && !field.value}
                helperText={!!errors[fieldConfig.name] && !field.value ? errors[fieldConfig.name]?.message as string : ""}
              />
              <AppButton
                variant="outlined"
                size="small"
                sx={{ mt: 1, ml: 1 }}
                onClick={() => handleHelpMeWrite(fieldConfig.name, t(fieldConfig.helpPrompt))}
              >
                {t("helpMeWrite")}
              </AppButton>
            </Box>
          )}
        />
      ))}
      <AppDialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth title={t("aiSuggestion")}
        actions={
          <>
            <AppButton onClick={handleClose}>{t("discard")}</AppButton>
            <AppButton onClick={handleEdit} disabled={aiSuggestion.loading || !!aiSuggestion.error}>{t("acceptAndEdit")}</AppButton>
            <AppButton onClick={handleAccept} disabled={aiSuggestion.loading || !!aiSuggestion.error}>{t("accept")}</AppButton>
          </>
        }
      >
        {aiSuggestion.loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" minHeight={80}>
            <CircularProgress />
          </Box>
        ) : aiSuggestion.error ? (
          <Box color="error.main">{(() => {
            let msg = aiSuggestion.error;
            if (msg === "unauthorized") return t("errorUnauthorized");
            if (msg === "rate_limit") return t("errorRateLimit");
            if (msg === "timeout") return t("errorTimeout");
            return msg || t("errorFetchingSuggestion");
          })()}</Box>
        ) : (
          <AppTextField
            value={aiSuggestion.suggestion}
            onChange={/* no-op, suggestion is not editable here */ () => {}}
            fullWidth
            multiline
            minRows={3}
            autoFocus
            slotProps={{ input: { "aria-label": t("aiSuggestion") } }}
          />
        )}
      </AppDialog>
    </Box>
  );
};

export default SituationDescriptionsForm;
