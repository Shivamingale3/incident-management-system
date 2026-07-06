import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SeverityBadge } from "@/components/app/severity-badge";
import { IncidentSeverityStyles } from "@/constants/incidentSererity.constants";
import type { IncidentSeverityType } from "@/types/incidents.types";

const severities: IncidentSeverityType[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

describe("SeverityBadge", () => {
  for (const sev of severities) {
    it(`renders the ${sev} label`, () => {
      render(<SeverityBadge severity={sev} />);
      expect(screen.getByText(sev)).toBeInTheDocument();
    });
  }

  it("applies the matching IncidentSeverityStyles[severity] class", () => {
    const sev: IncidentSeverityType = "CRITICAL";
    render(<SeverityBadge severity={sev} />);
    const badge = screen.getByText(sev).closest("[data-slot='badge']");
    expect(badge?.className).toContain(
      IncidentSeverityStyles[sev].split(" ")[0],
    );
  });

  it("applies a custom className when provided", () => {
    render(<SeverityBadge severity="LOW" className="custom-class" />);
    const badge = screen.getByText("LOW").closest("[data-slot='badge']");
    expect(badge?.className).toContain("custom-class");
  });
});
