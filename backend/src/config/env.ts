import { config } from 'dotenv';
import envSchema from '../validations/env.schema.js';

config();

export const env = envSchema.parse(process.env);
