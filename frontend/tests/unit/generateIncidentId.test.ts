import { describe, it, expect } from "vitest";
import incidentIdGenerator from "@/utils/generateIncidentId";

describe("incidentIdGenerator", () => {
  it('returns a string prefixed with "INC-"', () => {
    expect(incidentIdGenerator()).toMatch(/^INC-/);
  });

  it("returns a ULID-based suffix of 26 chars after the dash", () => {
    const id = incidentIdGenerator();
    expect(id.length).toBe(30); // "INC-" (4) + 26-char ULID
    expect(id.slice(4).length).toBe(26);
  });

  it("uses only the ULID alphabet (0-9 A-Z, excluding I L O U)", () => {
    expect(incidentIdGenerator().slice(4)).toMatch(/^[0-9A-HJKMNP-TV-Z]+$/);
  });

  it("generates many distinct ids across sequential calls", async () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(incidentIdGenerator());
      // Allow ulid to advance its random/time component
      await new Promise((r) => setTimeout(r, 1));
    }
    // ULID guarantees monotonic id within the same millisecond, plus
    // 80 bits of randomness ⇒ we should get at least 50 distinct ids.
    expect(ids.size).toBeGreaterThan(50);
  });
});
