import { all } from "redux-saga/effects";
import { aiSuggestionSaga } from "./aiSuggestion";

export default function* rootSaga() {
  yield all([
    aiSuggestionSaga(),
  ]);
}
