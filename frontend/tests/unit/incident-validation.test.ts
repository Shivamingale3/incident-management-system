import { describe, it, expect } from "vitest";
import { addIncidentValidationSchema } from "@/validations/incident.validation";

describe("addIncidentValidationSchema", () => {
  const valid = {
    title: "API outage in production",
    incidentId: "INC-ABC123",
    description: "<p>something broke</p>",
    service: "api-gateway",
    severity: "HIGH",
    status: "OPEN",
    assignee: "on-call",
  };

  it("parses a fully valid input", () => {
    const r = addIncidentValidationSchema.parse(valid);
    expect(r.title).toBe("API outage in production");
    expect(r.incidentId).toBe("INC-ABC123");
    expect(r.severity).toBe("HIGH");
  });

  it("rejects title shorter than 5 chars", () => {
    const r = addIncidentValidationSchema.safeParse({ ...valid, title: "ab" });
    expect(r.success).toBe(false);
  });

  it("rejects title longer than 500 chars", () => {
    const r = addIncidentValidationSchema.safeParse({
      ...valid,
      title: "x".repeat(501),
    });
    expect(r.success).toBe(false);
  });

  it("rejects incidentId that does not start with INC", () => {
    const r = addIncidentValidationSchema.safeParse({
      ...valid,
      incidentId: "ABC-1",
    });
    expect(r.success).toBe(false);
  });

  it("rejects invalid severity enum", () => {
    const r = addIncidentValidationSchema.safeParse({
      ...valid,
      severity: "URGENT" as never,
    });
    expect(r.success).toBe(false);
  });

  it("rejects invalid status enum", () => {
    const r = addIncidentValidationSchema.safeParse({
      ...valid,
      status: "DONE" as never,
    });
    expect(r.success).toBe(false);
  });

  it("rejects missing required severity", () => {
    const { severity: _omit, ...rest } = valid;
    const r = addIncidentValidationSchema.safeParse(rest);
    expect(r.success).toBe(false);
  });

  it("treats blank description (after stripHtml) as null", () => {
    const r = addIncidentValidationSchema.parse({
      ...valid,
      description: "<p></p>",
    });
    expect(r.description).toBeNull();
  });

  it("rejects non-null description whose cleaned content is < 5 chars", () => {
    const r = addIncidentValidationSchema.safeParse({
      ...valid,
      description: "<p>ab</p>",
    });
    expect(r.success).toBe(false);
  });

  it("rejects service name shorter than 2 chars", () => {
    const r = addIncidentValidationSchema.safeParse({
      ...valid,
      service: "a",
    });
    expect(r.success).toBe(false);
  });

  it("rejects service name longer than 100 chars", () => {
    const r = addIncidentValidationSchema.safeParse({
      ...valid,
      service: "x".repeat(101),
    });
    expect(r.success).toBe(false);
  });

  it("accepts null/blank optional fields: description, service, assignee", () => {
    const r = addIncidentValidationSchema.safeParse({
      title: "valid title here",
      incidentId: "INC-X",
      severity: "LOW",
      status: "OPEN",
      description: null,
      service: null,
      assignee: null,
    });
    expect(r.success).toBe(true);
  });
});
