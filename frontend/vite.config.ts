import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { envSchema } from "./src/validations/env.validation.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const rawEnv = loadEnv(mode, path.resolve(__dirname, ".."), "VITE_");

  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    console.error("\n❌ Invalid environment variables:\n");
    for (const issue of result.error.issues) {
      console.error(`  • ${issue.path.join(".")}: ${issue.message}`);
    }
    console.error("");
    process.exit(1);
  }

  return {
    envDir: path.resolve(__dirname, ".."),
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
