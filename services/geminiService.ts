
import { GoogleGenAI, Type } from "@google/genai";
import type { CropRecommendationData } from '../types';

// Fix: Adhere to the coding guidelines for initializing the GoogleGenAI client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      cropName: { type: Type.STRING, description: "The common name of the crop." },
      suitabilityScore: { type: Type.INTEGER, description: "A score from 0 to 100 indicating suitability." },
      rationale: { type: Type.STRING, description: "A brief, 1-2 sentence explanation for the recommendation." },
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
    required: ['cropName', 'suitabilityScore', 'rationale', 'comparisonMetrics']
  },
};


interface RecommendationParams {
  lat: number;
  lon: number;
  avgTemp: number;
  soilMoisture: number;
  soilPh: number;
}

export const getCropRecommendations = async (params: RecommendationParams): Promise<CropRecommendationData[]> => {
  const { lat, lon, avgTemp, soilMoisture, soilPh } = params;

  const prompt = `
    You are an expert agricultural consultant. Based on the following environmental data, recommend the most suitable crop to plant. Also provide three alternative crops.
    
    Environmental Data:
    - Location (approximate): Latitude ${lat.toFixed(2)}, Longitude ${lon.toFixed(2)}
    - Average Temperature (next 7 days): ${avgTemp.toFixed(1)}°C
    - Soil Moisture: ${soilMoisture}%
    - Soil pH: ${soilPh}

    Return an array of four crop objects. The first object in the array should be the absolute best recommendation.
    Ensure the response is ONLY a valid JSON array matching the provided schema.
  `;
  
  try {
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

  } catch (error) {
    console.error("Error fetching crop recommendations from Gemini:", error);
    // Return mock data on failure to prevent UI from breaking
    return [
        { cropName: "Tomato", suitabilityScore: 85, rationale: "Tomatoes thrive in this temperature and pH range.", comparisonMetrics: { 'Water Need': 6, 'Market Value': 8, 'Pest Resistance': 5 } },
        { cropName: "Corn", suitabilityScore: 78, rationale: "Corn is a resilient alternative that suits the soil moisture.", comparisonMetrics: { 'Water Need': 8, 'Market Value': 7, 'Pest Resistance': 7 } },
        { cropName: "Lettuce", suitabilityScore: 75, rationale: "A good option for cooler parts of the growing season.", comparisonMetrics: { 'Water Need': 5, 'Market Value': 6, 'Pest Resistance': 4 } },
        { cropName: "Beans", suitabilityScore: 72, rationale: "Beans are nitrogen-fixing and improve soil health.", comparisonMetrics: { 'Water Need': 4, 'Market Value': 7, 'Pest Resistance': 6 } }
    ];
  }
};