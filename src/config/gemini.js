
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash-exp";
const API_KEY = "AIzaSyDBjMbpFkKiAawm068LSX4B6nbsFY-pYSI";

async function runChat(prompt, chatHistory = []) { // Accept chat history as an argument
  if (!API_KEY) {
    console.error("REACT_APP_GEMINI_API_KEY is not set in environment variables.");
    return null; // Or throw an error if you prefer
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1, // Consider lowering temperature for more focused responses
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: chatHistory, // Use the provided chat history
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    console.log(responseText);
    return responseText; // Return the response text
  } catch (error) {
    console.error("Error sending message:", error);
    return null; // Return null in case of error
  }
}

export default runChat;