import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useDealsPage } from "./useDealsPage";

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

vi.mock("../../../hooks/useCRMDeals", () => ({
  useCRMDeals: vi.fn(() => ({
    deals: [],
    dealsByStage: {},
    stageOrder: [],
    stats: { pipelineValue: 0, wonThisMonth: 0, activeDeals: 0, totalDeals: 0 },
    isLoading: false,
    isError: false,
  })),
}));

const mockUpdateDealStage = vi.fn();
vi.mock("../../../hooks/useUpdateDealStage", () => ({
  useUpdateDealStage: vi.fn(() => ({ updateDealStage: mockUpdateDealStage })),
}));

describe("useDealsPage", () => {
  it("returns deals data and updateDealStage", () => {
    const { result } = renderHook(() => useDealsPage());
    expect(result.current.deals).toEqual([]);
    expect(result.current.updateDealStage).toBe(mockUpdateDealStage);
  });

  it("returns stageOrder and stats from useCRMDeals", () => {
    const { result } = renderHook(() => useDealsPage());
    expect(result.current.stageOrder).toEqual([]);
    expect(result.current.stats).toEqual({
      pipelineValue: 0,
      wonThisMonth: 0,
      activeDeals: 0,
      totalDeals: 0,
    });
  });
});
