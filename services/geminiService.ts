import { GoogleGenAI, Type } from "@google/genai";
import { Job, Candidate, AIAnalysisResult } from '../types';
import { t } from '../i18n';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const findBestCandidates = async (job: Job, candidates: Candidate[], topN: number): Promise<AIAnalysisResult | null> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }

  const model = 'gemini-2.5-flash';

  const simplifiedCandidates = candidates.map(({ id, skills, experience, education, headline }) => ({
      id,
      headline,
      skills,
      experience,
      education
  }));

  const prompt = t('gemini.prompt.base', {
    jobTitle: job.title,
    jobDescription: job.description,
    jobQualifications: job.qualifications.join(', '),
    candidatesJson: JSON.stringify(simplifiedCandidates, null, 2),
    matchCount: topN,
  });
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    bestMatches: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                candidateId: { type: Type.STRING },
                                rank: { type: Type.INTEGER },
                                justification: { type: Type.STRING },
                                score: { type: Type.INTEGER },
                            },
                            required: ["candidateId", "rank", "justification", "score"],
                        },
                    },
                },
                required: ["bestMatches"],
            },
        },
    });

    const resultText = response.text.trim();
    const resultJson = JSON.parse(resultText) as AIAnalysisResult;
    return resultJson;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};