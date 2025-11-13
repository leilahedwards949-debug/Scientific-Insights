
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

export const solveSymbolicMath = async (expression: string): Promise<string> => {
  const prompt = `
    You are a symbolic math expert, simulating the capabilities of the SymPy library.
    Solve the following mathematical expression or equation for the user.
    Provide the solution steps in a clear, formatted way using Markdown, and state the final answer clearly.

    Expression: "${expression}"
  `;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error in solveSymbolicMath:", error);
    return "An error occurred while processing your request. Please check the console for details.";
  }
};

export const performLinearRegression = async (data: string, predictX: string): Promise<string> => {
  const prompt = `
    You are a data scientist using a tool like Scikit-learn to perform linear regression.
    Given the following comma-separated (X,Y) data points:
    ${data}

    1. Perform a linear regression on this data.
    2. Provide the slope (m), the y-intercept (b), and the equation of the line (y = mx + b).
    3. Then, using the calculated model, predict the corresponding Y value for the new X value: ${predictX}.
    
    Present the results in a clear, well-structured Markdown format.
  `;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error in performLinearRegression:", error);
    return "An error occurred while processing your request. Please check the console for details.";
  }
};

export const answerAstronomyQuestion = async (question: string): Promise<string> => {
  const prompt = `
    You are an expert astronomy calculation engine, simulating the capabilities of the Astropy library.
    Answer the following user query with precision and accuracy. Provide explanations where necessary.
    Use Markdown for formatting.

    Query: "${question}"
  `;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error in answerAstronomyQuestion:", error);
    return "An error occurred while processing your request. Please check the console for details.";
  }
};

export const analyzeDataset = async (data: string): Promise<string> => {
    const prompt = `
      You are a data analyst. Analyze the following dataset and provide a brief summary of its trends, key statistics (mean, median, standard deviation), and any notable outliers. The data is a list of numbers. Present your analysis in clear, concise Markdown.

      Dataset:
      ${data}
    `;
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in analyzeDataset:", error);
        return "An error occurred while analyzing the dataset.";
    }
};
