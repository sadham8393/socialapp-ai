/* global console */
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import process from "process";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/ai-suggest", async (req, res) => {
  const { prompt } = req.body;
  if (!OPENAI_API_KEY) {
    return res.status(401).json({ error: "API key missing" });
  }
  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 120,
          temperature: 0.7,
        }),
      },
    );
    if (openaiRes.status === 401)
      return res.status(401).json({ error: "unauthorized" });
    if (openaiRes.status === 429)
      return res.status(429).json({ error: "rate_limit" });
    if (!openaiRes.ok) return res.status(500).json({ error: "API error" });
    const data = await openaiRes.json();
    res.json({ suggestion: data.choices?.[0]?.message?.content?.trim() || "" });
  } catch {
    res.status(500).json({ error: "server_error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI Suggestion API running on port ---> ${PORT}`);
});
