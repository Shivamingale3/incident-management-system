import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { makeQueryWrapper } from "../helpers/query-client";
import { useUpdateIncidentStatus } from "@/hooks/use-update-incident-status";
import * as incidentService from "@/services/incident.service";

vi.mock("@/lib/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const toastSuccess = vi.fn();
const toastError = vi.fn();
vi.mock("sonner", () => ({
  toast: {
    success: (_, opts) => toastSuccess(_, opts),
    error: (_, opts) => toastError(_, opts),
  },
}));

const apiPatchMock = vi.mocked(
  (await import("@/lib/axiosInstance")).default.patch,
);

describe("useUpdateIncidentStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("on success: patches the status endpoint and invalidates 3 queries; shows success toast", async () => {
    apiPatchMock.mockResolvedValueOnce({ data: { success: true } });
    const spy = vi.spyOn(incidentService, "updateIncidentStatus");

    const { wrapper, queryClient } = makeQueryWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    const { result } = renderHook(() => useUpdateIncidentStatus(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        incidentId: "01ABC",
        status: "RESOLVED" as const,
      });
    });

    expect(spy).toHaveBeenCalledWith("01ABC", "RESOLVED");
    expect(apiPatchMock).toHaveBeenCalledWith(
      "/incident/01ABC/status/RESOLVED",
    );
    expect(toastSuccess).toHaveBeenCalledTimes(1);

    const invalidateKeys = invalidateSpy.mock.calls.map((c) => c[0]);
    expect(invalidateKeys).toContainEqual({ queryKey: ["incidents"] });
    expect(invalidateKeys).toContainEqual({
      queryKey: ["incident", "01ABC"],
    });
    expect(invalidateKeys).toContainEqual({ queryKey: ["dashboard-kpi"] });
  });

  it("on error: shows error toast and does not invalidate", async () => {
    apiPatchMock.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: "Incident not found" } },
      message: "Request failed",
    });

    const { wrapper, queryClient } = makeQueryWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    const { result } = renderHook(() => useUpdateIncidentStatus(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          incidentId: "01ABC",
          status: "RESOLVED" as const,
        });
      } catch {
        // expected
      }
    });

    expect(toastError).toHaveBeenCalledTimes(1);
    expect(toastError.mock.calls[0]?.[0]).toBe("Incident not found");
    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
