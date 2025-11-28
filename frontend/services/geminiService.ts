import { GoogleGenAI } from "@google/genai";

// Fix: Use import.meta.env for Vite and ensure the key exists
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("API Key is missing! Make sure VITE_GEMINI_API_KEY is set in your frontend .env file.");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateSummary = async (text: string): Promise<string> => {
  try {
    // Fix: Use a valid model name (gemini-1.5-flash is the current standard)
    const model = 'gemini-1.5-flash'; 
    const prompt = `Please summarize the following study notes into concise bullet points suitable for a university student review:\n\n${text}`;

    const response = await ai.models.generateContent({
      model: model,
      // Fix: Ensure contents follows the correct structure
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    return response.text || "No summary could be generated.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary. Please try again later.";
  }
};

export const askQuestion = async (context: string, question: string): Promise<string> => {
    try {
      const model = 'gemini-1.5-flash';
      const prompt = `Context: ${context}\n\nQuestion: ${question}\n\nAnswer the question based on the context provided. Keep it helpful and educational.`;
  
      const response = await ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
  
      return response.text || "I couldn't find an answer.";
    } catch (error) {
      console.error("Error answering question:", error);
      return "Error processing your question.";
    }
  };