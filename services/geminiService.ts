
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

if (!import.meta.env.VITE_API_KEY) {
    throw new Error("VITE_API_KEY environment variable not set");
}
  
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export async function generateHeadshot(base64ImageData: string, mimeType: string, prompt: string): Promise<string> {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            // Check for safety ratings or other reasons for no image
            const textResponse = response.text?.trim();
            if(textResponse) {
                throw new Error(`API returned text instead of an image: "${textResponse}" This might be due to a safety policy violation.`);
            }
            throw new Error("The AI model did not return an image. Please try a different photo or style.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate headshot: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while generating the headshot.");
    }
}
