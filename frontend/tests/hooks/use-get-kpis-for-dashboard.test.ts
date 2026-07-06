import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { makeQueryWrapper } from "../helpers/query-client";
import useGetKpisForDashboard from "@/hooks/use-get-kpis-for-dashboard";

vi.mock("@/lib/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const apiGetMock = vi.mocked((await import("@/lib/axiosInstance")).default.get);

describe("useGetKpisForDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls GET /incident/kpis and returns data array", async () => {
    const kpis = [
      { title: "TOTAL INCIDENTS", value: 5, subtitle: "Currently tracked" },
      { title: "OPEN INCIDENTS", value: 3, subtitle: "Needs attention" },
    ];
    apiGetMock.mockResolvedValueOnce({
      data: { success: true, message: "ok", data: kpis },
    });

    const { wrapper, queryClient } = makeQueryWrapper();
    const { result } = renderHook(() => useGetKpisForDashboard(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiGetMock).toHaveBeenCalledWith("/incident/kpis");
    expect(result.current.data).toEqual(kpis);
    expect(queryClient.getQueryData(["dashboard-kpi"])).toEqual(kpis);
  });

  it("propagates fetch errors as isError state", async () => {
    apiGetMock.mockRejectedValueOnce(new Error("boom"));

    const { wrapper } = makeQueryWrapper();
    const { result } = renderHook(() => useGetKpisForDashboard(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
