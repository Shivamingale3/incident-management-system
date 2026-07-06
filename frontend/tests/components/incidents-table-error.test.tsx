import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AxiosError } from "axios";
import IncidentsTableError from "@/components/app/errors/incidents-table-error";

describe("IncidentsTableError", () => {
  it("renders the generic heading when error is null", () => {
    render(
      <table>
        <tbody>
          <IncidentsTableError error={null} onRetry={vi.fn()} />
        </tbody>
      </table>,
    );
    expect(screen.getByText("Failed to load incidents")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong, try again!"),
    ).toBeInTheDocument();
  });

  it("renders a Retry button", () => {
    render(
      <table>
        <tbody>
          <IncidentsTableError error={null} onRetry={vi.fn()} />
        </tbody>
      </table>,
    );
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("calls onRetry when the Retry button is clicked", () => {
    const onRetry = vi.fn();
    render(
      <table>
        <tbody>
          <IncidentsTableError error={null} onRetry={onRetry} />
        </tbody>
      </table>,
    );
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders the axios error message when an AxiosError with response.data.message is provided", () => {
    const err = new AxiosError(
      "Request failed",
      undefined,
      undefined,
      undefined,
      {
        status: 500,
        data: { message: "Database is down" },
      } as never,
    );
    render(
      <table>
        <tbody>
          <IncidentsTableError error={err} onRetry={vi.fn()} />
        </tbody>
      </table>,
    );
    expect(screen.getByText("Database is down")).toBeInTheDocument();
  });
});
