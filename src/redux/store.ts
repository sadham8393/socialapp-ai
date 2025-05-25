import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import aiSuggestionReducer from "./sagas/aiSuggestion";
import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    aiSuggestion: aiSuggestionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
