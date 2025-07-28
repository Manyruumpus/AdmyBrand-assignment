import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Get the campaign data from the request body
    const { campaigns } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You are a world-class digital marketing analyst.
      Analyze the following marketing campaign performance data and provide three concise, actionable insights for the user.
      1. Identify the top-performing campaign based on Revenue and a low Cost Per Acquisition (CPA).
      2. Identify the campaign with the highest spend and evaluate its effectiveness.
      3. Provide a specific recommendation for a paused campaign that should be reactivated or an active campaign that could be optimized.

      Format your response as a simple string. Use '*' for bullet points. Be brief and direct.

      Data: ${JSON.stringify(campaigns)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ insights: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
  }
}