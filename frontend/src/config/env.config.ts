import { envSchema } from "@/validations/env.validation";

const env = envSchema.parse(import.meta.env);

export default env;
