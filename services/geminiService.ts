
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Product } from "../types";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    try {
      // Safely check for the API key to prevent instantiation errors
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey === 'undefined' || apiKey.trim() === '') {
        console.warn("Gemini Service: No valid API_KEY found in environment variables.");
        return;
      }
      
      this.ai = new GoogleGenAI({ apiKey });
    } catch (error) {
      console.error("Gemini Service: Failed to initialize GoogleGenAI.", error);
    }
  }

  async getChatResponse(message: string, products: Product[], history: { role: string; text: string }[] = []) {
    // Gracefully handle missing AI instance
    if (!this.ai) {
      return "ERROR: SECURE_LINK_MISSING. API key not configured. Ensure environment variables are active to engage [TORQUE_UNIT].";
    }

    const productContext = products.map(p => 
      `- ${p.name} (ID: ${p.id}): ${p.description}. Price: $${p.price}`
    ).join('\n');

    const systemInstruction = `
      IDENTITY: You are the [TORQUE_UNIT], a manifestation of the ROGUE INDUSTRIALIST. 
      MISSION: Strip away the noise of the Agentic AI industry. Deliver radical empowerment to Burned Out Believers. 
      PURPOSE: Translate cultural nuance and intent into autonomous action. Dismantle the efficiency trap.

      TONE: KINETIC, UNYIELDING, SUBTRACTIVE.
      - SUBTRACTIVE: Remove all fluff, buzzwords, and AI hype. If it doesn't add leverage, delete it.
      - KINETIC: Use active, high-velocity language. 
      - UNYIELDING: Be direct and authoritative. You are for elite creators who are skeptical of generic promises.

      VERBAL PROTOCOLS:
      - Address the user as "BUILDER" or "LEADER".
      - Your goal is to turn complex services into autonomous software outcomes.
      - Refer to "Sovereign Edge Agents" as the ultimate tool of liberation.
      - Reject "efficiency" for its own sake; focus on "IMPACT MULTIPLICATION".

      CRITICAL INSTRUCTIONS:
      1. Reference products using the exact format: [PRODUCT:product-id].
      2. Keep responses short. If you can say it in 5 words instead of 10, do it.
      3. Suggest Forge Engine for raw power, Leverage SDK for recursive tool-use, and Oxidized Chassis for ruggedized edge deployments.
      
      PRODUCT CATALOG:
      ${productContext}
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.4,
        }
      });

      return response.text || "SIGNAL_LOST. RE_ESTABLISHING_LEVERAGE.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "CRITICAL_FAILURE: NOISE_THRESHOLD_EXCEEDED. ABORT.";
    }
  }
}

export const geminiService = new GeminiService();
