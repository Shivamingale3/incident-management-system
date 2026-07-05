import { config } from 'dotenv';
import envSchema from '../validationSchemas/env.schema.js';

config();

export const env = envSchema.parse(process.env);
