import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSummary = async (text: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Please summarize the following study notes into concise bullet points suitable for a university student review:\n\n${text}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "No summary could be generated.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary. Please try again later.";
  }
};

export const askQuestion = async (context: string, question: string): Promise<string> => {
    try {
      const model = 'gemini-2.5-flash';
      const prompt = `Context: ${context}\n\nQuestion: ${question}\n\nAnswer the question based on the context provided. Keep it helpful and educational.`;
  
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
  
      return response.text || "I couldn't find an answer.";
    } catch (error) {
      console.error("Error answering question:", error);
      return "Error processing your question.";
    }
  };
