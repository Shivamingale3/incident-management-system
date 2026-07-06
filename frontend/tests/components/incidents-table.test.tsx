import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AxiosError } from "axios";
import IncidentsTable from "@/components/app/incidents-table";
import type { Incident } from "@/types/incidents.types";

const makeIncident = (over: Partial<Incident> = {}): Incident => ({
  id: "01ABC",
  incidentId: "INC-1",
  title: "API outage",
  description: null,
  service: null,
  severity: "HIGH",
  status: "OPEN",
  assignee: null,
  summary: null,
  possibleCauses: null,
  recommendedActions: null,
  rootCause: null,
  createdAt: "2026-07-05T10:00:00.000Z",
  updatedAt: "2026-07-05T10:00:00.000Z",
  ...over,
});

describe("IncidentsTable", () => {
  it("renders the skeleton state when isLoading and no incidents", () => {
    const { container } = render(
      <IncidentsTable
        incidents={[]}
        isLoading={true}
        isError={false}
        error={null}
        onRetry={vi.fn()}
      />,
    );
    // Skeleton renders 10 rows
    expect(container.querySelectorAll("tbody tr")).toHaveLength(10);
  });

  it("renders the empty state when not loading and no incidents", () => {
    render(
      <IncidentsTable
        incidents={[]}
        isLoading={false}
        isError={false}
        error={null}
        onRetry={vi.fn()}
      />,
    );
    expect(screen.getByText("No Incidents Yet")).toBeInTheDocument();
  });

  it("renders the error state with retry when isError", () => {
    const onRetry = vi.fn();
    render(
      <IncidentsTable
        incidents={[]}
        isLoading={false}
        isError={true}
        error={new Error("Network failed")}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByText("Failed to load incidents")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong, try again!"),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders the incident rows when data is loaded", () => {
    const incidents = [
      makeIncident({ id: "01A", incidentId: "INC-A", title: "Outage A" }),
      makeIncident({ id: "01B", incidentId: "INC-B", title: "Outage B" }),
    ];
    render(
      <IncidentsTable
        incidents={incidents}
        isLoading={false}
        isError={false}
        error={null}
        onRetry={vi.fn()}
      />,
    );
    expect(screen.getByText("INC-A")).toBeInTheDocument();
    expect(screen.getByText("INC-B")).toBeInTheDocument();
    expect(screen.getByText("Outage A")).toBeInTheDocument();
    expect(screen.getByText("Outage B")).toBeInTheDocument();
  });

  it("renders the table header row with all 7 columns", () => {
    render(
      <IncidentsTable
        incidents={[]}
        isLoading={false}
        isError={false}
        error={null}
        onRetry={vi.fn()}
      />,
    );
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Service")).toBeInTheDocument();
    expect(screen.getByText("Severity")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Assignee")).toBeInTheDocument();
    expect(screen.getByText("Created At")).toBeInTheDocument();
  });

  it("renders the generic error message for a non-Axios Error", () => {
    render(
      <IncidentsTable
        incidents={[]}
        isLoading={false}
        isError={true}
        error={new Error("Some internal error")}
        onRetry={vi.fn()}
      />,
    );
    // Non-Axios Error falls through to the generic message
    expect(
      screen.getByText("Something went wrong, try again!"),
    ).toBeInTheDocument();
  });

  it("renders the axios error message in the error state", () => {
    // Real AxiosError so `error instanceof AxiosError` matches at runtime
    const axiosErr = new AxiosError(
      "Request failed",
      "ERR_BAD_REQUEST",
      undefined,
      undefined,
      {
        status: 500,
        data: { message: "Backend error" },
        statusText: "Internal Server Error",
        headers: {},
        config: {} as never,
      } as never,
    );
    render(
      <IncidentsTable
        incidents={[]}
        isLoading={false}
        isError={true}
        error={axiosErr}
        onRetry={vi.fn()}
      />,
    );
    expect(screen.getByText("Backend error")).toBeInTheDocument();
  });
});
