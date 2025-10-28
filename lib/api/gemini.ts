import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!, // secure API key
});

export async function getGeminiResponse(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

 //cleaner response text
    const cleanedText = (response.text ?? "Wait for some Quotes...")
      .replace(/\*\*/g, "") // remove double asterisks (bold)
      .replace(/\*/g, "")   // remove single asterisks (italic)
      .trim();

    return cleanedText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn’t generate a response right now.";
  }
}
