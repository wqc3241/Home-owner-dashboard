import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
// Note: In a real production app, this should be proxied through a backend to protect the key.
// For this client-side demo, we use the env variable directly as per instructions.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getHomeAdvice = async (query: string, context: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure your environment to use the AI Advisor.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Context: The user is a homeowner using a management dashboard. 
      Home Details: ${context}
      
      User Question: ${query}
      
      Provide a helpful, concise response focusing on home value, maintenance advice, or financial impact. Format with clear paragraphs.`,
    });
    
    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while analyzing your request. Please try again.";
  }
};