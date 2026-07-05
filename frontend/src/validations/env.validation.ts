import z from "zod";

export const envSchema = z.object({
  VITE_API_BASE_URL: z
    .string("Invalid API base URL")
    .nonoptional()
    .refine(
      (val) => /^https?:\/\/.+/.test(val) || val.startsWith("/"),
      "Invalid API base URL"
    ),
});
