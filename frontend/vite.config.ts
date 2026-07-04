import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { envSchema } from "./src/validations/env.validation";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const rawEnv = loadEnv(mode, process.cwd(), "VITE_");

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
