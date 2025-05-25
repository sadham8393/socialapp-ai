import axios from "axios";

export async function fetchAiSuggestionApi(prompt: string, signal: AbortSignal): Promise<string> {
  const res = await axios.post(
    "/api/ai-suggest",
    { prompt },
    { signal, headers: { "Content-Type": "application/json" } }
  );
  return res.data.suggestion || "";
}
