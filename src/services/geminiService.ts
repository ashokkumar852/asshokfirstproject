import { GoogleGenAI, Type } from "@google/genai";
import { PortfolioData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const portfolioSchema = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING },
    title: { type: Type.STRING },
    bio: { type: Type.STRING },
    contact: {
      type: Type.OBJECT,
      properties: {
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        location: { type: Type.STRING },
        linkedin: { type: Type.STRING },
        github: { type: Type.STRING },
        website: { type: Type.STRING },
      },
      required: ["email"],
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          items: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["category", "items"],
      },
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          period: { type: Type.STRING },
          description: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["company", "role", "period", "description"],
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          link: { type: Type.STRING },
        },
        required: ["name", "description", "techStack"],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          institution: { type: Type.STRING },
          degree: { type: Type.STRING },
          period: { type: Type.STRING },
        },
        required: ["institution", "degree", "period"],
      },
    },
    certificates: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          issuer: { type: Type.STRING },
          date: { type: Type.STRING },
        },
        required: ["name", "issuer"],
      },
    },
    achievements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ["fullName", "title", "bio", "contact", "skills", "experience", "projects", "education"],
};

export async function convertResumeToPortfolio(resumeText: string): Promise<PortfolioData> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Convert the following resume text into a structured portfolio JSON. 
    Make the bio engaging and professional. 
    Ensure the skills are categorized logically.
    Resume Text:
    ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: portfolioSchema,
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate portfolio data.");
  }

  return JSON.parse(response.text) as PortfolioData;
}
