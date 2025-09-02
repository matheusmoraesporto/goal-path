"use server";

import OpenAI from "openai";
import { generateUserPreferencesPrompt } from "./templates/user-preferences";
import responseTemplate from "./templates/expected-response";
import { UserPreferences } from "goal-path/app/types/user-preferences";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fetchDataFromOpenAI = async (userPreferences: UserPreferences) => {
  try {
    const res = await client.responses.create({
      model: "gpt-5-nano",
      tools: [{ type: "web_search" }],
      input: `
        ${generateUserPreferencesPrompt(userPreferences)}
        ${responseTemplate}`,
    });
    console.log("OpenAI response", res);
    console.log("OpenAI response output", res.output);
    console.log("OpenAI response output text", res.output_text);
    return res.output_text;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("OpenAI error", err);
    throw new Error(err?.message || "OpenAI request failed");
  }
};

export { fetchDataFromOpenAI };
