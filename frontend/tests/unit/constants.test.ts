import { describe, it, expect } from "vitest";
import {
  IncidentSeverity,
  IncidentSeverityStyles,
} from "@/constants/incidentSererity.constants";
import {
  IncidentStatus,
  IncidentStatusLabels,
  IncidentStatusStyles,
} from "@/constants/incidentStatus.constants";
import {
  PAGE_SIZE_OPTIONS,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NO,
} from "@/constants/pagination.constants";
import { AutoFetchPeriods } from "@/constants/incident.constants";

describe("Constants", () => {
  describe("pagination constants", () => {
    it("exposes the standard page-size options", () => {
      expect(PAGE_SIZE_OPTIONS).toEqual([10, 20, 50]);
    });

    it("exposes the default page size and page no", () => {
      expect(DEFAULT_PAGE_SIZE).toBe(10);
      expect(DEFAULT_PAGE_NO).toBe(1);
    });
  });

  describe("IncidentSeverity", () => {
    it("has all 4 severity keys", () => {
      expect(Object.keys(IncidentSeverity).sort()).toEqual([
        "CRITICAL",
        "HIGH",
        "LOW",
        "MEDIUM",
      ]);
    });

    it("IncidentSeverityStyles has a class for each severity", () => {
      for (const key of Object.keys(IncidentSeverity) as Array<
        keyof typeof IncidentSeverity
      >) {
        expect(IncidentSeverityStyles[key]).toBeTruthy();
      }
    });
  });

  describe("IncidentStatus", () => {
    it("has all 5 status keys", () => {
      expect(Object.keys(IncidentStatus).sort()).toEqual([
        "CLOSED",
        "INVESTIGATING",
        "IN_PROGRESS",
        "OPEN",
        "RESOLVED",
      ]);
    });

    it("IncidentStatusLabels has a label for each status", () => {
      for (const key of Object.keys(IncidentStatus) as Array<
        keyof typeof IncidentStatus
      >) {
        expect(typeof IncidentStatusLabels[key]).toBe("string");
        expect(IncidentStatusLabels[key].length).toBeGreaterThan(0);
      }
    });

    it("IncidentStatusStyles has a class for each status", () => {
      for (const key of Object.keys(IncidentStatus) as Array<
        keyof typeof IncidentStatus
      >) {
        expect(IncidentStatusStyles[key]).toBeTruthy();
      }
    });
  });

  describe("AutoFetchPeriods", () => {
    it("is an array of {label, value} entries", () => {
      expect(Array.isArray(AutoFetchPeriods)).toBe(true);
      for (const entry of AutoFetchPeriods) {
        expect(typeof entry.label).toBe("string");
        expect(typeof entry.value).toBe("number");
      }
    });

    it("includes the 5s and 1m options", () => {
      const labels = AutoFetchPeriods.map((p) => p.label);
      expect(labels).toContain("5s");
      expect(labels).toContain("1m");
    });
  });
});
