import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { makeQueryWrapper } from "../helpers/query-client";
import { useCreateIncident } from "@/hooks/use-create-incident";
import * as incidentService from "@/services/incident.service";

// Mock axios + sonner to capture toast side effects.
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

const apiPostMock = vi.mocked(
  (await import("@/lib/axiosInstance")).default.post,
);

describe("useCreateIncident", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("on success: posts to /incident, shows success toast, invalidates incidents+dashboard-kpi", async () => {
    apiPostMock.mockResolvedValueOnce({ data: { success: true } });
    const spy = vi.spyOn(incidentService, "createIncident");

    const { wrapper, queryClient } = makeQueryWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    const { result } = renderHook(() => useCreateIncident(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        title: "API down",
        incidentId: "INC-X",
        service: null,
        description: "something broke badly",
        severity: "HIGH" as const,
        status: "OPEN" as const,
        assignee: null,
      });
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(apiPostMock).toHaveBeenCalledWith("/incident", expect.anything());
    expect(toastSuccess).toHaveBeenCalledTimes(1);

    const invalidateKeys = invalidateSpy.mock.calls.map((c) => c[0]);
    expect(invalidateKeys).toContainEqual({ queryKey: ["incidents"] });
    expect(invalidateKeys).toContainEqual({ queryKey: ["dashboard-kpi"] });
  });

  it("on error: shows error toast with axios message", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Validation failed" } },
      message: "Request failed",
    };
    apiPostMock.mockRejectedValueOnce(axiosError);

    const { wrapper } = makeQueryWrapper();
    const { result } = renderHook(() => useCreateIncident(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          title: "x",
          incidentId: "INC-X",
          service: null,
          description: null,
          severity: "LOW" as const,
          status: "OPEN" as const,
          assignee: null,
        });
      } catch {
        // expected
      }
    });

    expect(toastError).toHaveBeenCalledTimes(1);
    expect(toastError.mock.calls[0]?.[0]).toBe("Validation failed");
  });
});
