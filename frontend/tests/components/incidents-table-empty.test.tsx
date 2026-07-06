import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import IncidentsTableEmpty from "@/components/app/empty/incidents-table-empty";

describe("IncidentsTableEmpty", () => {
  it("renders the empty-state title", () => {
    render(
      <table>
        <tbody>
          <IncidentsTableEmpty />
        </tbody>
      </table>,
    );
    expect(screen.getByText("No Incidents Yet")).toBeInTheDocument();
  });

  it("renders the empty-state description", () => {
    render(
      <table>
        <tbody>
          <IncidentsTableEmpty />
        </tbody>
      </table>,
    );
    expect(
      screen.getByText(/No Incidents found everything good/i),
    ).toBeInTheDocument();
  });

  it("does not call any action (static empty state)", () => {
    const { container } = render(
      <table>
        <tbody>
          <IncidentsTableEmpty />
        </tbody>
      </table>,
    );
    // No buttons in the empty state
    expect(container.querySelectorAll("button")).toHaveLength(0);
  });
});
