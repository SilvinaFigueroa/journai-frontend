// Google Gemini Implementation

import { GoogleGenerativeAI} from "@google/generative-ai";
import systemInstruction from '../utils/apiSystemInstruction.mjs'

// Use environment variables for API key
const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_KEY
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction

})

const generationConfig = {
    temperature: 0.95,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};


const geminiCall = async ({ user, journals }) => {
    try {
        console.log(`API called...`)
        const chatSession = model.startChat({
            generationConfig,
            history: [
            ]
        });

        const result = await chatSession.sendMessage(`Analyze the following journal entries for ${user.firstName} and identify patterns. Journals: ${journals}`);
        return result.response.text();
    } catch (err) {
        console.error('Error from Google Generative AI:', err.response ? err.response.data : err.message);
        throw err;
    }
};


export default geminiCall