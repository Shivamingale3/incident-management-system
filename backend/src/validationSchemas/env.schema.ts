import z from 'zod';

const envSchema = z.object({
  APP_PORT: z.coerce.number().default(5000).nonoptional(),
  APP_ENV: z
    .enum(['development', 'test', 'production'], {
      error: 'App enviroment can be development , test or production',
    })
    .nonoptional(),
  DATABASE_URL: z.string().nonoptional(),
  GEMINI_API_KEY: z.string().nonoptional('Gemini API key is required'),
  GEMINI_MODEL: z.string().nonoptional('Model is required'),
});

export default envSchema;
