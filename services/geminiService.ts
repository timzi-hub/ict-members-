
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

export const generateArtPiece = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key not found. Image generation will fail.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a high-end digital art masterpiece. Style: Minimalist, Contemporary. Subject: ${prompt}. Ensure high resolution and professional aesthetic suitable for a modern gallery.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model");
  } catch (error) {
    console.error("Error generating art:", error);
    throw error;
  }
};
