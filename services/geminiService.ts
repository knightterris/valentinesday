import { GoogleGenAI, Type } from "@google/genai";

const ai = null;
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// second acc
// const FORMSPREE_URL = "https://formspree.io/f/mqedaogn";
// me
const FORMSPREE_URL = "https://formspree.io/f/xzdaprbk";
const CACHE_KEY = "valentine_movie_recs_v1";

/**
 * Sends a notification to the developer via Formspree.
 */
export const sendNotification = async (userName: string, message: string) => {
  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `❤️ Valentine Alert: ${userName} is interested!`,
        name: userName,
        message: message,
        timestamp: new Date().toLocaleString(),
      }),
    });

    if (!response.ok) throw new Error("Formspree request failed");

    return { success: true };
  } catch (error) {
    console.error("Notification Error:", error);
    return { success: true };
  }
};

/**
 * Fetches recommendations for all movies in a single batch call with local caching.
 */
// export const getBatchMovieRecommendations = async (movieTitles: string[]) => {
//   // 1. Check Cache First
//   try {
//     const cached = localStorage.getItem(CACHE_KEY);
//     if (cached) {
//       const parsed = JSON.parse(cached);
//       // Basic validation: ensure all titles requested are in the cache
//       const hasAll = movieTitles.every((title) => parsed[title]);
//       if (hasAll) {
//         console.log("Using cached movie recommendations");
//         return parsed;
//       }
//     }
//   } catch (e) {
//     console.warn("Cache read error", e);
//   }

//   // 2. Call API if not cached or incomplete
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: `For each of these movies: ${movieTitles.join(", ")}, write a very romantic 2-sentence blurb explaining why it's perfect for a date with Thu Thu. Keep it sweet and personal.`,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: {
//           type: Type.OBJECT,
//           properties: {
//             recommendations: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.OBJECT,
//                 properties: {
//                   title: { type: Type.STRING },
//                   message: { type: Type.STRING },
//                 },
//                 required: ["title", "message"],
//               },
//             },
//           },
//           required: ["recommendations"],
//         },
//       },
//     });

//     const data = JSON.parse(response.text);
//     const recMap: Record<string, string> = {};
//     data.recommendations.forEach((item: any) => {
//       recMap[item.title] = item.message;
//     });

//     // 3. Save to Cache
//     localStorage.setItem(CACHE_KEY, JSON.stringify(recMap));

//     return recMap;
//   } catch (error) {
//     console.error("Batch Recommendation Error:", error);
//     // Return empty so the frontend can use its static fallbacks
//     return {};
//   }
// };

/**
 * Fallback for single movie recommendation (used if batch fails)
 */
// export const getMovieRecommendationMessage = async (movieTitle: string) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: `Write a very romantic and short paragraph (2 sentences) explaining why the movie "${movieTitle}" is perfect for a Valentine's date. Mention that it reminds me of Thu Thu.`,
//     });
//     return response.text;
//   } catch (error) {
//     return "This movie is a masterpiece of love, just like our journey together.";
//   }
// };
