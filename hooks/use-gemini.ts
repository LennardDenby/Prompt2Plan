import { GoogleGenAI } from '@google/genai';
import { formatInTimeZone, toDate } from 'date-fns-tz';
import { useState } from 'react';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const LOCAL_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export type EventDetails = {
  title: string;
  startDate: string;
  endDate: string;
  notes?: string;
  location?: string;
};

export function useGemini() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractEventDetails = async (prompt: string): Promise<EventDetails | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenAI({apiKey: API_KEY})
      const model = 'gemini-2.0-flash-001'

      const now = new Date();
      const localDateTimeString = formatInTimeZone(now, LOCAL_TIME_ZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");

      const systemPrompt = 
        `You are an AI assistant that extracts calendar event details from natural language.
        Given a user prompt, extract and return ONLY a JSON object with the following fields:
        - title: The event title
        - startDate: ISO 8601 format date-time string in timezone ${LOCAL_TIME_ZONE}
        - endDate: ISO 8601 format date-time string in timezone ${LOCAL_TIME_ZONE} (default 1 hour after start)
        - notes: Any additional notes or description (optional)
        - location: Event location if mentioned (optional)

        Current date and time in user's timezone (${LOCAL_TIME_ZONE}): ${localDateTimeString}
        IMPORTANT: All dates must be in the user's timezone: ${LOCAL_TIME_ZONE}

        Return ONLY the JSON object, no markdown, no explanation, no code blocks.

        Example prompt: "Meeting with John tomorrow at 2pm"
        Example response: {"title":"Meeting with John","startDate":"2025-10-04T14:00:00+01:00","endDate":"2025-10-04T15:00:00+01:00"}`;

      const result = await genAI.models.generateContent({
        model: model,
        contents: `${systemPrompt}\n\nUser prompt: "${prompt}"`
      });
      const text = await result.text;
    
      if (text == null) {
        throw new Error('No response from Gemini API');
      }

      let jsonText = text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }

      const eventDetails = JSON.parse(jsonText);

      const localStart = toDate(eventDetails.startDate, { timeZone: LOCAL_TIME_ZONE }).toISOString();
      const localEnd = toDate(eventDetails.endDate, { timeZone: LOCAL_TIME_ZONE }).toISOString();
      const localEventDetails = {
        ...eventDetails,
        startDate: localStart,
        endDate: localEnd,
      };
      
      setIsLoading(false);
      return localEventDetails;
    } catch (err) {
      console.error('Gemini API error:', err);
      setError(err instanceof Error ? err.message : 'Failed to extract event details');
      setIsLoading(false);
      return null;
    }
  };

  return {
    extractEventDetails,
    isLoading,
    error,
  };
}
