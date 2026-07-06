import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { makeQueryWrapper } from "../helpers/query-client";
import useGetIncidents from "@/hooks/use-get-incidents";

// Mock the axios instance so service calls don't go out over the network.
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

describe("useGetIncidents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls GET /incident/filter with query params and returns data", async () => {
    apiGetMock.mockResolvedValueOnce({
      data: {
        success: true,
        message: "ok",
        data: {
          data: [{ id: "01", incidentId: "INC-1", title: "x" }],
          page: 1,
          totalPages: 1,
          total: 1,
          pageSize: 20,
        },
      },
    });

    const { wrapper, queryClient } = makeQueryWrapper();
    const params = {
      status: "OPEN" as const,
      severity: null,
      searchQuery: "test",
      pageSize: 20,
      pageNo: 1,
    };
    const { result } = renderHook(() => useGetIncidents(params), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiGetMock).toHaveBeenCalledTimes(1);
    const callArgs = apiGetMock.mock.calls[0];
    expect(callArgs?.[0]).toBe("/incident/filter");
    const configArg = apiGetMock.mock.calls[0]?.[1] as
      { params?: URLSearchParams | Record<string, string> } | undefined;
    expect(configArg?.params).toBeDefined();

    // The configured params carry the query values
    const sp = configArg?.params as URLSearchParams;
    expect(sp.get("status")).toBe("OPEN");
    expect(sp.get("searchQuery")).toBe("test");
    expect(sp.get("pageSize")).toBe("20");

    expect(result.current.data?.data).toHaveLength(1);
    expect(
      queryClient.getQueryData(["incidents", "OPEN", null, "test", 20, 1]),
    ).toBeDefined();
  });

  it("propagates fetch errors as isError state", async () => {
    apiGetMock.mockRejectedValueOnce(new Error("Network down"));

    const { wrapper } = makeQueryWrapper();
    const params = {
      status: null,
      severity: null,
      searchQuery: "",
      pageSize: 10,
      pageNo: 1,
    };
    const { result } = renderHook(() => useGetIncidents(params), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
