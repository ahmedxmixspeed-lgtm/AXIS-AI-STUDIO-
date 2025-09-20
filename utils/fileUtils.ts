
import type { Part } from '@google/genai';

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // Remove the data URL prefix e.g. "data:image/jpeg;base64,"
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });
}

export async function fileToGenerativePart(file: File): Promise<Part> {
    const base64Data = await fileToBase64(file);
    return {
        inlineData: {
            mimeType: file.type,
            data: base64Data,
        },
    };
}
