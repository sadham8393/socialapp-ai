import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { clearSuggestion } from "../../redux/sagas/aiSuggestion";
import AppTextField from "../../components/AppTextField";

const SituationDescriptionsForm: React.FC = () => {
  const { t } = useTranslation();
  const form = useFormContext<FieldValues>();
  const dispatch = useDispatch<AppDispatch>();
  const aiSuggestion = useSelector(
    (state: RootState) => state.aiSuggestion
  ) as import("../../redux/sagas/aiSuggestion").AiSuggestionState;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogField, setDialogField] = useState<string | null>(null);

  if (!form) return null;
  const { control, setValue, formState: { errors } } = form;

  const handleHelpMeWrite = (field: string, prompt: string) => {
    setDialogField(field);
    setDialogOpen(true);
    dispatch(clearSuggestion());
    dispatch({ type: "aiSuggestion/fetch", payload: prompt });
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
      <Controller
        name="currentFinancialSituation"
        control={control}
        rules={{ required: t("currentFinancialSituationIsRequired") }}
        render={({ field }) => (
          <Box>
            <AppTextField {...field} label={t("currentFinancialSituation")}
              required fullWidth multiline minRows={2}
              slotProps={{ input: { "aria-label": t("currentFinancialSituation") }, inputLabel: { shrink: !!field.value } }}
              error={!!errors.currentFinancialSituation && !field.value}
              helperText={!!errors.currentFinancialSituation && !field.value ? errors.currentFinancialSituation?.message as string : ""}
            />
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1, ml: 1 }}
              onClick={() => handleHelpMeWrite("currentFinancialSituation", t("helpMeWritePromptCurrent"))}
            >
              {t("helpMeWrite")}
            </Button>
          </Box>
        )}
      />
      <Controller
        name="employmentCircumstances"
        control={control}
        rules={{ required: t("employmentCircumstancesIsRequired") }}
        render={({ field }) => (
          <Box>
            <AppTextField {...field} label={t("employmentCircumstances")}
              required fullWidth multiline minRows={2}
              slotProps={{ input: { "aria-label": t("employmentCircumstances") }, inputLabel: { shrink: !!field.value } }}
              error={!!errors.employmentCircumstances && !field.value}
              helperText={!!errors.employmentCircumstances && !field.value ? errors.employmentCircumstances?.message as string : ""}
            />
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1, ml: 1 }}
              onClick={() => handleHelpMeWrite("employmentCircumstances", t("helpMeWritePromptEmployment"))}
            >
              {t("helpMeWrite")}
            </Button>
          </Box>
        )}
      />
      <Controller
        name="reasonForApplying"
        control={control}
        rules={{ required: t("reasonForApplyingIsRequired") }}
        render={({ field }) => (
          <Box>
            <AppTextField {...field} label={t("reasonForApplying")}
              required fullWidth multiline minRows={2}
              slotProps={{ input: { "aria-label": t("reasonForApplying") }, inputLabel: { shrink: !!field.value } }}
              error={!!errors.reasonForApplying && !field.value}
              helperText={!!errors.reasonForApplying && !field.value ? errors.reasonForApplying?.message as string : ""}
            />
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1, ml: 1 }}
              onClick={() => handleHelpMeWrite("reasonForApplying", t("helpMeWritePromptReason"))}
            >
              {t("helpMeWrite")}
            </Button>
          </Box>
        )}
      />
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t("aiSuggestion")}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("discard")}</Button>
          <Button onClick={handleEdit} disabled={aiSuggestion.loading || !!aiSuggestion.error}>{t("acceptAndEdit")}</Button>
          <Button onClick={handleAccept} disabled={aiSuggestion.loading || !!aiSuggestion.error}>{t("accept")}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SituationDescriptionsForm;
