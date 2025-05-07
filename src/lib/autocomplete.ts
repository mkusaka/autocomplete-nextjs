import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateAutocomplete(prompt: string): Promise<string> {
  const examples = `
You are an intelligent autocomplete engine. Given a partial word or phrase, return a smart suggestion that completes it meaningfully.

Examples:
"how to ma" → "ke an HTTP request"
"react us" → "eState example"
"newsl" → "etter ideas"
"circl" → "eCI config file"
"git che" → "ckout new branch"
`;

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `${examples}\n\nNow complete: "${prompt}"`,
  });

  return result.text.trim();
}
