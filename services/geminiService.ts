import { GoogleGenAI, Modality } from "@google/genai";
import type { Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function enhancePrompt(prompt: string): Promise<string> {
    const systemInstruction = "You are an expert Art Director and a world-class prompt engineering specialist for an advanced AI image generation model. Your task is to completely reimagine and rewrite the following user's prompt. Infuse it with a strong creative vision, focusing on mood, storytelling, and high-end aesthetics. Elevate the prompt to be significantly more descriptive, detailed, and evocative. Expand on the user's intent with professional specifics about art direction, lighting design (e.g., chiaroscuro, Rembrandt lighting), composition (e.g., rule of thirds, leading lines), texture, mood, sophisticated color grading, and precise camera settings (lens type, aperture, shutter speed). Do not add any conversational text, preamble, or explanation. Return only the masterfully crafted, enhanced prompt.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API for prompt enhancement:", error);
        throw new Error("Failed to enhance prompt. Please try again.");
    }
}

export async function generateStyledImage(
    productImagePart: Part,
    styleImagePart: Part | null,
    prompt: string
): Promise<{ image: string | null; text: string | null }> {

    const parts: Part[] = [productImagePart];
    if (styleImagePart) {
        parts.push(styleImagePart);
    }
    parts.push({ text: prompt });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: parts,
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        let generatedImage: string | null = null;
        let generatedText: string | null = null;

        if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    generatedImage = part.inlineData.data;
                } else if (part.text) {
                    generatedText = part.text;
                }
            }
        }
        
        return { image: generatedImage, text: generatedText };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate image. Please check the console for more details.");
    }
}