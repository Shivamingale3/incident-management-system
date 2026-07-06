import { GoogleGenAI } from '@google/genai';
import { env } from './env.config.js';

// Client-wide HTTP options:
// - timeout: 80s so a slow Gemini call answers before nginx's 90s proxy
//   read timeout fires (otherwise users see an opaque HTML 504 from nginx
//   instead of a structured JSON error from our backend).
// - retryOptions.attempts: 1 (no retries). The SDK default of 5 attempts
//   doubles the latency on transient failures and burns the Gemini-side
//   rate-limit budget, causing surprise 429s on the next user attempt.
const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
  httpOptions: {
    timeout: 80_000,
    retryOptions: { attempts: 1 },
  },
});

export default gemini;
