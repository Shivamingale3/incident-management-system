import type { envSchema } from "@/validations/env.validation";
import type { z } from "zod";

export type Env = z.infer<typeof envSchema>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
