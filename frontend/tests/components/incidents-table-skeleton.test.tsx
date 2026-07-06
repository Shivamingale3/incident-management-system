import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import IncidentsTableSkeleton from "@/components/app/skeletons/incidents-table-skeleton";

describe("IncidentsTableSkeleton", () => {
  it("renders the default number of skeleton rows (10)", () => {
    const { container } = render(
      <table>
        <tbody>
          <IncidentsTableSkeleton />
        </tbody>
      </table>,
    );
    expect(container.querySelectorAll("tr")).toHaveLength(10);
  });

  it("renders the requested number of skeleton rows", () => {
    const { container } = render(
      <table>
        <tbody>
          <IncidentsTableSkeleton rows={5} />
        </tbody>
      </table>,
    );
    expect(container.querySelectorAll("tr")).toHaveLength(5);
  });

  it("renders 7 skeleton cells per row", () => {
    const { container } = render(
      <table>
        <tbody>
          <IncidentsTableSkeleton rows={1} />
        </tbody>
      </table>,
    );
    const row = container.querySelector("tr");
    expect(row?.querySelectorAll("td")).toHaveLength(7);
  });
});
