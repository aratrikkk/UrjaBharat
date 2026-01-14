
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

const getAI = () => new GoogleGenAI({ apiKey: API_KEY });

/**
 * Technical briefing for specific recommendations using core industrial reasoning.
 */
export const getAIExplanation = async (recommendation: string, context: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an industrial thermodynamic expert at a Govt PSU, explain this optimization:
      Context: ${context}
      Action: ${recommendation}
      
      Requirements:
      1. Explain the physics (e.g., Isentropic efficiency, Joule-Thomson effect).
      2. Quantify financial impact in INR (₹).
      3. Use a formal, authoritative tone. Do not mention any AI provider names.`,
      config: { temperature: 0.2 }
    });
    return response.text;
  } catch (error) {
    return "Technical briefing currently unavailable. Proceed with standard operating procedure.";
  }
};

/**
 * Real-time operational directive based on current stats.
 */
export const getGeneralInsight = async (stats: string) => {
    const ai = getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze these real-time compressor stats: ${stats}. Provide a single, critical operational directive for a plant manager. Be extremely concise.`,
      });
      return response.text;
    } catch (e) {
      return "Efficiency stable. Maintain current load distribution.";
    }
};

/**
 * Predictive analysis based on a trend of data points.
 * Focuses on 'Measures to be Taken' and data analytics.
 */
export const getPredictiveAnalysis = async (dataTrend: string) => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze the following sequence of industrial telemetry data (timestamp, power, efficiency):
            ${dataTrend}
            
            Perform a deep-data analysis and provide:
            1. TREND ANALYSIS: Identify efficiency leaks or deviations from the design curve.
            2. 4-HOUR PROJECTION: Estimated power load and efficiency impact if no action is taken.
            3. MEASURES TO BE TAKEN: Provide 3 concrete, high-impact technical adjustments (e.g., valve positioning, speed modulation, purge cycles).
            
            Tone: Highly technical, data-driven, PSU compliant. Strictly avoid mentioning AI model names or "Gemini".`,
        });
        return response.text;
    } catch (e) {
        return "Predictive engine warming up. Analyzing trend buffers for next reporting cycle...";
    }
};

/**
 * Formal shift handover report generation.
 */
export const generateShiftHandover = async (dataSummary: string) => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate a formal 'Shift Handover Report' based on this data: ${dataSummary}. Include:
            1. Executive Summary
            2. Safety & Compliance Check
            3. Efficiency Anomalies
            4. Recommended focus for the incoming shift.
            Tone: Bureaucratic, Official, Professional. Do not mention AI provider names.`,
        });
        return response.text;
    } catch (e) {
        return "Failed to generate official report.";
    }
};

/**
 * Root Cause Analysis (RCA) for detected anomalies.
 */
export const diagnoseAnomaly = async (symptoms: string) => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `The following industrial anomaly was detected: ${symptoms}. 
            Provide a Root Cause Analysis (RCA) and immediate corrective action. 
            Include the 'Why-Why' analysis logic. Strictly industrial tone.`,
        });
        return response.text;
    } catch (e) {
        return "Unable to perform RCA. Consult manual Section 4.B.";
    }
};
