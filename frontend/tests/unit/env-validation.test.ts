import { describe, it, expect } from "vitest";
import { envSchema } from "@/validations/env.validation";

describe("envSchema", () => {
  it("accepts an http URL", () => {
    const result = envSchema.safeParse({
      VITE_API_BASE_URL: "http://localhost:5000/api",
    });
    expect(result.success).toBe(true);
  });

  it("accepts an https URL", () => {
    const result = envSchema.safeParse({
      VITE_API_BASE_URL: "https://api.example.com",
    });
    expect(result.success).toBe(true);
  });

  it("accepts an absolute path (e.g. /api for nginx-proxied SPAs)", () => {
    const result = envSchema.safeParse({ VITE_API_BASE_URL: "/api" });
    expect(result.success).toBe(true);
  });

  it("rejects an empty string", () => {
    const result = envSchema.safeParse({ VITE_API_BASE_URL: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a relative path that does not start with /", () => {
    const result = envSchema.safeParse({ VITE_API_BASE_URL: "api" });
    expect(result.success).toBe(false);
  });

  it("rejects an undefined value", () => {
    const result = envSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects a non-URL non-slash string", () => {
    const result = envSchema.safeParse({ VITE_API_BASE_URL: "banana" });
    expect(result.success).toBe(false);
  });
});
