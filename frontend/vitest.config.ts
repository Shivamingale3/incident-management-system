import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read .env from project root (one level up from frontend/) so we can inline
// `import.meta.env.VITE_*` via `define`. This matches vite.config.ts (which
// reads root .env via envDir) without inheriting its `process.exit(1)` logic.
const rootEnv = loadEnv("test", path.resolve(__dirname, ".."), "VITE_");
const VITE_API_BASE_URL =
  rootEnv.VITE_API_BASE_URL ?? "http://localhost:5000/api";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(VITE_API_BASE_URL),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/components/ui/**",
      ],
    },
  },
});
