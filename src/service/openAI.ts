"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fetchDataFromOpenAI = async () => {
  try {
    const res = await client.responses.create({
      model: "gpt-5-nano",
      tools: [{ type: "web_search" }],
      // TODO: Aqui deverá ser aplicado o template para criação do road map
      // baseado nas preferências do usuário
      input: "Gere para mim uma lista de conteúdos para aprender React",
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
