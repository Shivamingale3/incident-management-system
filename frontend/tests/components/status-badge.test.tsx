import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/app/status-badge";
import {
  IncidentStatusLabels,
  IncidentStatusStyles,
} from "@/constants/incidentStatus.constants";
import type { IncidentStatusType } from "@/types/incidents.types";

const statuses: IncidentStatusType[] = [
  "OPEN",
  "INVESTIGATING",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];

describe("StatusBadge", () => {
  for (const status of statuses) {
    it(`renders the label "${IncidentStatusLabels[status]}" for status ${status}`, () => {
      render(<StatusBadge status={status} />);
      expect(
        screen.getByText(IncidentStatusLabels[status]),
      ).toBeInTheDocument();
    });
  }

  it("applies the matching IncidentStatusStyles class", () => {
    const status: IncidentStatusType = "RESOLVED";
    render(<StatusBadge status={status} />);
    const badge = screen
      .getByText(IncidentStatusLabels[status])
      .closest("[data-slot='badge']");
    expect(badge?.className).toContain(
      IncidentStatusStyles[status].split(" ")[0],
    );
  });

  it("applies a custom className when provided", () => {
    render(<StatusBadge status="OPEN" className="extra-cls" />);
    const badge = screen
      .getByText(IncidentStatusLabels["OPEN"])
      .closest("[data-slot='badge']");
    expect(badge?.className).toContain("extra-cls");
  });
});
