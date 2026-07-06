import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  formatIncidentCreatedAt,
  formatIncidentCreatedAtToLocale,
} from "@/utils/dateUtils";

describe("dateUtils", () => {
  beforeEach(() => {
    // Freeze time so luxon's "now" is deterministic for relative formatting.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-05T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("formatIncidentCreatedAt", () => {
    it("returns a non-empty relative string", () => {
      const iso = "2026-07-05T11:00:00Z";
      const out = formatIncidentCreatedAt(iso);
      expect(typeof out).toBe("string");
      expect(out.length).toBeGreaterThan(0);
      expect(out).not.toBe("Unknown");
    });

    it('returns "Unknown" for an unparseable input', () => {
      expect(formatIncidentCreatedAt("not-a-date")).toBe("Unknown");
    });
  });

  describe("formatIncidentCreatedAtToLocale", () => {
    it("returns a formatted string in dd/MM/yyyy - h:mm a pattern", () => {
      const iso = "2026-07-05T12:00:00Z";
      const out = formatIncidentCreatedAtToLocale(iso);
      expect(typeof out).toBe("string");
      // Luxon's h:mm a = hour:minute am/pm. Expect a colon in the time portion.
      expect(out).toMatch(/\d{2}\/\d{2}\/\d{4} - \d{1,2}:\d{2} (AM|PM)/i);
    });
  });
});
