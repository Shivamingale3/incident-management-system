import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import KPIcard from "@/components/app/kpi-card";

describe("KPIcard", () => {
  it("renders the title, value, and subtitle", () => {
    render(
      <KPIcard
        title="TOTAL INCIDENTS"
        value={42}
        subtitle="Currently tracked"
      />,
    );
    expect(screen.getByText("TOTAL INCIDENTS")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("Currently tracked")).toBeInTheDocument();
  });

  it("renders 0 when value is 0", () => {
    render(
      <KPIcard title="ACTIVE INCIDENTS" value={0} subtitle="Needs attention" />,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("uses red color for CRITICAL INCIDENTS", () => {
    render(
      <KPIcard
        title="CRITICAL INCIDENTS"
        value={5}
        subtitle="Immediate action"
      />,
    );
    const valueEl = screen.getByText("5");
    expect(valueEl.className).toContain("text-red-500");
  });

  it("uses green color for RESOLVED INCIDENTS", () => {
    render(
      <KPIcard title="RESOLVED INCIDENTS" value={10} subtitle="Resolved" />,
    );
    const valueEl = screen.getByText("10");
    expect(valueEl.className).toContain("text-green-500");
  });

  it("uses white color for TOTAL INCIDENTS (default branch)", () => {
    render(
      <KPIcard
        title="TOTAL INCIDENTS"
        value={7}
        subtitle="Currently tracked"
      />,
    );
    const valueEl = screen.getByText("7");
    expect(valueEl.className).toContain("text-white");
  });
});
