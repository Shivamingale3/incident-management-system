import { describe, it, expect } from "vitest";
import { getIncidentsByFilterValidationSchema } from "@/validations/getIncidentFilters.schema";

describe("getIncidentsByFilterValidationSchema", () => {
  it("applies default pageNo=1 and pageSize=10 when omitted", () => {
    const r = getIncidentsByFilterValidationSchema.parse({});
    expect(r.pageNo).toBe(1);
    expect(r.pageSize).toBe(10);
  });

  it("coerces string pageSize to number", () => {
    const r = getIncidentsByFilterValidationSchema.parse({ pageSize: "50" });
    expect(r.pageSize).toBe(50);
    expect(typeof r.pageSize).toBe("number");
  });

  it("coerces string pageNo to number", () => {
    const r = getIncidentsByFilterValidationSchema.parse({ pageNo: "3" });
    expect(r.pageNo).toBe(3);
  });

  it("rejects pageSize < 1", () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ pageSize: "0" });
    expect(r.success).toBe(false);
  });

  it("rejects pageSize > 100", () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({
      pageSize: "101",
    });
    expect(r.success).toBe(false);
  });

  it("rejects pageSize NaN", () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({
      pageSize: "abc",
    });
    expect(r.success).toBe(false);
  });

  it("rejects pageNo < 1", () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ pageNo: "0" });
    expect(r.success).toBe(false);
  });

  it("rejects invalid status enum", () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({
      status: "DONE" as never,
    });
    expect(r.success).toBe(false);
  });

  it("rejects invalid severity enum", () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({
      severity: "URGENT" as never,
    });
    expect(r.success).toBe(false);
  });

  it("accepts valid status + severity + searchQuery", () => {
    const r = getIncidentsByFilterValidationSchema.parse({
      status: "OPEN",
      severity: "LOW",
      searchQuery: "db",
    });
    expect(r.status).toBe("OPEN");
    expect(r.severity).toBe("LOW");
    expect(r.searchQuery).toBe("db");
  });
});
