import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const getDestinationInfo = async (req: Request, res: Response) => {
  try {
    const { destination } = req.body;

    if (!destination) {
      return res.status(400).json({ status: 'fail', message: 'Destination required' });
    }

    // 1. AI Request
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `
      Give me a JSON summary for "${destination}":
      { "summary": "2 sentences", "bestTime": "Season", "localDish": "Food name" }
      No markdown.
    `;
    const aiPromise = model.generateContent(prompt);

    // 2. Unsplash Image Request (We keep this!)
    const unsplashPromise = axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: destination, per_page: 1, orientation: 'landscape' },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });

    // Wait for both (Removed Ticketmaster)
    const [aiResult, unsplashResult] = await Promise.all([
      aiPromise,
      unsplashPromise.catch(err => ({ data: null }))
    ]);

    // Process AI
    const text = aiResult.response.text().replace(/```json|```/g, '').trim();
    let aiData;
    try {
      aiData = JSON.parse(text);
    } catch (e) {
      aiData = { summary: text, bestTime: "Unknown", localDish: "Unknown" };
    }

    // Process Image
    const fetchedImage = unsplashResult.data?.results[0]?.urls?.regular || null;

    res.status(200).json({
      status: 'success',
      data: {
        ...aiData,
        image: fetchedImage
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
};
export const getTourPlan = async (req: Request, res: Response) => {
  try {
    const { budget, interests } = req.body;

    if (!budget || !interests) {
      return res.status(400).json({ status: 'fail', message: 'Budget and interests required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // THE SUPER PROMPT
    const prompt = `
      Act as a Senior Travel Architect. 
      Create a highly realistic 3-day travel itinerary for a client with a budget of $${budget} USD who loves: "${interests}".

      STRICT RULES:
      1. REALISM: Do not suggest expensive cities (like Tokyo/NYC) if the budget is under $1000. Suggest cheaper alternatives (like Vietnam, Bali, or local trips) if budget is low.
      2. LOGIC: The "totalCost" must include estimated flights, hotel, and food. It must be close to $${budget}.
      3. FORMAT: Return ONLY valid JSON. No markdown, no conversational text.

      JSON STRUCTURE:
      {
        "tripTitle": "City, Country: The [Adjective] Experience",
        "totalCost": "$[Amount]",
        "hotelRecommendation": "Name of a specific hotel/hostel fitting the budget",
        "days": [
          { 
            "day": 1, 
            "theme": "Theme of the day (e.g. History & Food)", 
            "morning": "Specific activity with estimated cost", 
            "afternoon": "Specific activity with estimated cost", 
            "evening": "Dinner or Nightlife activity" 
          },
          { 
            "day": 2, 
            "theme": "Theme of the day", 
            "morning": "...", 
            "afternoon": "...", 
            "evening": "..." 
          },
          { 
            "day": 3, 
            "theme": "Theme of the day", 
            "morning": "...", 
            "afternoon": "...", 
            "evening": "..." 
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    
    // CLEANING THE RESPONSE (Crucial for stability)
    // Sometimes AI adds \`\`\`json at the start. We remove it.
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const plan = JSON.parse(text);

    res.status(200).json({
      status: 'success',
      data: plan,
    });

  } catch (err) {
    console.error("AI Plan Error:", err);
    // If AI fails, send a fallback message instead of crashing
    res.status(500).json({ 
      status: 'error', 
      message: 'AI could not generate a plan. Try increasing your budget or changing interests.' 
    });
  }
};