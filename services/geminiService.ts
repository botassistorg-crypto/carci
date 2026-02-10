import { GoogleGenAI, Type } from "@google/genai";
import { MarketingCampaign, SocialPost, Car } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateCarMarketingStrategy = async (car: Car): Promise<MarketingCampaign> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    Create a luxury social media marketing campaign to sell or rent this car for 'Carcian' dealership in Bangladesh:
    Car: ${car.year} ${car.brand} ${car.name}
    Type: ${car.category}
    Price: $${car.price} ${car.category === 'Rental' ? 'per day' : 'total price'}
    Engine: ${car.engine}
    
    Target Audience: Businessmen in Dhaka, Luxury travellers, families needing reliable transport.
    
    Requirements:
    1. Generate 3 posts (Instagram, TikTok, Facebook).
    2. Tone: Trustworthy, Premium, Local appeal (mention reliability on BD roads).
    3. Focus on the status and comfort of this specific car.
    
    Output JSON with:
    - targetAudience
    - projectedRevenue (Estimate based on high demand)
    - posts (platform, caption, hashtags, imagePrompt, estimatedRevenue, scheduledTime)
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            targetAudience: { type: Type.STRING },
            projectedRevenue: { type: Type.NUMBER },
            posts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING, enum: ["TikTok", "Instagram", "Facebook"] },
                  caption: { type: Type.STRING },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  imagePrompt: { type: Type.STRING },
                  estimatedRevenue: { type: Type.NUMBER },
                  scheduledTime: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (!response.text) throw new Error("No text response from Gemini");
    
    const data = JSON.parse(response.text);

    const posts: SocialPost[] = data.posts.map((p: any) => ({
      ...p,
      id: generateId(),
      status: 'pending'
    }));

    return {
      id: generateId(),
      carId: car.id,
      carName: `${car.brand} ${car.name}`,
      targetAudience: data.targetAudience,
      posts,
      projectedRevenue: data.projectedRevenue,
      isActive: true,
      createdAt: new Date().toISOString()
    };

  } catch (error) {
    console.error("Error generating campaign:", error);
    throw error;
  }
};

export const generateCarImage = async (prompt: string): Promise<string | undefined> => {
  const model = "gemini-2.5-flash-image";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [{ text: prompt + " The image should be photorealistic, cinematic lighting, 4k, automotive photography style, sleek showroom background." }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    return undefined;
  } catch (error) {
    console.error("Error generating image:", error);
    return undefined;
  }
};