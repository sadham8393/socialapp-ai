import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchAiSuggestionApi } from "../api/aiSuggestion";

export interface AiSuggestionState {
  loading: boolean;
  error: string | null;
  suggestion: string;
}

const initialState: AiSuggestionState = {
  loading: false,
  error: null,
  suggestion: "",
};

// Actions
export const fetchAiSuggestionRequest = "aiSuggestion/fetchRequest";
export const fetchAiSuggestionSuccess = "aiSuggestion/fetchSuccess";
export const fetchAiSuggestionFailure = "aiSuggestion/fetchFailure";

function* fetchAiSuggestionSaga(action: { type: string; payload: string }): Generator<unknown, void, unknown> {
  try {
    yield put({ type: fetchAiSuggestionRequest });
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), 15000);
    try {
      const suggestion = (yield call(fetchAiSuggestionApi, action.payload, controller.signal)) as string;
      globalThis.clearTimeout(timeout);
      yield put({ type: fetchAiSuggestionSuccess, payload: suggestion });
    } catch (e) {
      globalThis.clearTimeout(timeout);
      const err = e as unknown as { name?: string; response?: { status?: number; data?: { error?: string } } };
      let errorMsg = "API error";
      if ((err as { name?: string }).name === "AbortError") errorMsg = "timeout";
      else if (err.response?.status === 401) errorMsg = "unauthorized";
      else if (err.response?.status === 429) errorMsg = "rate_limit";
      else if (err.response?.data?.error) errorMsg = err.response.data.error;
      yield put({ type: fetchAiSuggestionFailure, payload: errorMsg });
    }
  } catch {
    yield put({ type: fetchAiSuggestionFailure, payload: "API error" });
  }
}

export function* aiSuggestionSaga() {
  yield takeLatest("aiSuggestion/fetch", fetchAiSuggestionSaga);
}

const aiSuggestionSlice = createSlice({
  name: "aiSuggestion",
  initialState,
  reducers: {
    clearSuggestion(state) {
      state.suggestion = "";
      state.error = null;
      state.loading = false;
    },
    fetch(state) {
      state.loading = true;
      state.error = null;
      state.suggestion = "";
    },
    fetchSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.suggestion = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearSuggestion, fetch, fetchSuccess, fetchFailure } = aiSuggestionSlice.actions;
export default aiSuggestionSlice.reducer;
