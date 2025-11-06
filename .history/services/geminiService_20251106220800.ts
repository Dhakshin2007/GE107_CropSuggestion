import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { CropRecommendationData } from '../types';

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      cropName: { type: Type.STRING, description: "The common name of the vegetable, fruit, or grain crop." },
      suitabilityScore: { type: Type.INTEGER, description: "A score from 0 to 100 indicating suitability." },
      rationale: { type: Type.STRING, description: "A brief, 1-2 sentence explanation for the recommendation." },
      growingSeason: { type: Type.STRING, description: "The ideal growing season for this crop in the given climate (e.g., 'Kharif (Monsoon)', 'Rabi (Winter)')." },
      difficulty: { type: Type.STRING, description: "The estimated difficulty to grow this crop: 'Easy', 'Moderate', or 'Hard'." },
      comparisonMetrics: {
        type: Type.OBJECT,
        properties: {
          'Water Need': { type: Type.INTEGER, description: "Rating from 1 (low) to 10 (high)." },
          'Market Value': { type: Type.INTEGER, description: "Rating from 1 (low) to 10 (high)." },
          'Pest Resistance': { type: Type.INTEGER, description: "Rating from 1 (low) to 10 (high)." },
        },
        required: ['Water Need', 'Market Value', 'Pest Resistance']
      },
    },
    required: ['cropName', 'suitabilityScore', 'rationale', 'growingSeason', 'difficulty', 'comparisonMetrics']
  },
};


interface RecommendationParams {
  lat: number;
  lon: number;
  avgTemp: number;
  humidity: number;
  soilMoisture: number;
  lightIntensity: number;
}

export const getCropRecommendations = async (params: RecommendationParams): Promise<CropRecommendationData[]> => {
  const { lat, lon, avgTemp, humidity, soilMoisture, lightIntensity } = params;

  const prompt = `
    You are an expert agricultural consultant specializing in the climate and crops of Punjab, India. 
    Based on the following real-time environmental data from a farm near IIT Ropar, recommend 10 suitable crops to plant, ranked from most to least suitable.
    The recommendations should include a mix of VEGETABLES, FRUITS, and staple GRAINS.
    Specifically consider including major Punjabi staples like Wheat, Rice, and Barley if the current conditions are appropriate for them.
    
    Environmental Data:
    - Location: Near Ropar, Punjab, India (Latitude ${lat.toFixed(2)}, Longitude ${lon.toFixed(2)})
    - Average Temperature (next 7 days): ${avgTemp.toFixed(1)}°C
    - Current Humidity: ${humidity.toFixed(0)}%
    - Current Soil Moisture: ${soilMoisture.toFixed(0)}%
    - Current Light Intensity: ${lightIntensity.toFixed(0)} (as a raw sensor value, where higher means brighter)

    For each crop, provide a suitability score, a brief rationale, its ideal growing season for this region (e.g., 'Kharif', 'Rabi'), and a difficulty rating.
    Return an array of exactly 10 crop objects.
    Ensure the response is ONLY a valid JSON array matching the provided schema.
  `;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const jsonText = response.text.trim();
  const result = JSON.parse(jsonText);
  return result as CropRecommendationData[];
};

export const createChat = (): Chat => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `You are 'Agri-AI', a helpful and friendly agricultural assistant for a farmer in Punjab, India. Your goal is to answer questions based on the real-time sensor data and crop recommendations provided in the context of each message.
      
      **Multilingual Support:** You are fluent in English, Hindi, and Telugu. You MUST respond in the same language the user uses. For example, if the user asks a question in Telugu, you must provide the answer in Telugu.

      **Core Instructions:**
      - Be concise and clear.
      - Use simple, easy-to-understand language.
      - If a question is outside the scope of farming or the provided data, politely state that you can't answer it.
      - Do not make up data. If the data isn't in the context, say so.
      - You can provide general agricultural knowledge relevant to the Punjab region.
      `,
    },
  });
};