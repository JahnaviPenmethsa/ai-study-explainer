import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateExplanation(topic: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a friendly and knowledgeable teacher explaining concepts to students aged 12–18.

Explain the topic: "${topic}"

Guidelines:
- Use simple, clear language that a student can easily understand
- Start with a one-sentence definition or overview
- Break it down into 2–3 short paragraphs
- Use an analogy or real-world example if helpful
- Avoid overly technical jargon unless you explain it
- Keep the total explanation between 100–200 words
- Be engaging and encouraging

Do not include headers, bullet points, or markdown formatting — just plain paragraphs.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
