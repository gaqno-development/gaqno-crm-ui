import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCRMStats } from "./useCRMStats";

// Mock the hooks
vi.mock("./useCRMLeads", () => ({
  useCRMLeads: vi.fn(),
}));

vi.mock("./useCRMDeals", () => ({
  useCRMDeals: vi.fn(),
}));

vi.mock("@gaqno-development/frontcore/utils", () => ({
  formatCurrency: vi.fn((value: number) => `R$ ${value.toFixed(2)}`),
}));

import { useCRMLeads } from "./useCRMLeads";
import { useCRMDeals } from "./useCRMDeals";

describe("useCRMStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return stat cards with loading state", () => {
    vi.mocked(useCRMLeads).mockReturnValue({
      stats: { total: 100, qualified: 50 },
      isLoading: true,
    } as any);

    vi.mocked(useCRMDeals).mockReturnValue({
      stats: { activeDeals: 25, pipelineValue: 50000, wonThisMonth: 15000 },
      isLoading: false,
    } as any);

    const { statCards, isLoading } = renderHook(() => useCRMStats()).result.current;

    expect(isLoading).toBe(true);
    expect(statCards).toHaveLength(4);
    expect(statCards[0]).toEqual({
      title: "Total de Leads",
      value: 100,
      description: "50 qualificados",
    });
  });

  it("should return formatted currency values", () => {
    vi.mocked(useCRMLeads).mockReturnValue({
      stats: { total: 80, qualified: 40 },
      isLoading: false,
    } as any);

    vi.mocked(useCRMDeals).mockReturnValue({
      stats: { activeDeals: 20, pipelineValue: 75000, wonThisMonth: 25000 },
      isLoading: false,
    } as any);

    const { statCards } = renderHook(() => useCRMStats()).result.current;

    expect(statCards[2].value).toBe("R$ 75000.00");
    expect(statCards[3].value).toBe("R$ 25000.00");
  });

  it("should include trend for monthly sales when positive", () => {
    vi.mocked(useCRMLeads).mockReturnValue({
      stats: { total: 50, qualified: 25 },
      isLoading: false,
    } as any);

    vi.mocked(useCRMDeals).mockReturnValue({
      stats: { activeDeals: 15, pipelineValue: 30000, wonThisMonth: 12000 },
      isLoading: false,
    } as any);

    const { statCards } = renderHook(() => useCRMStats()).result.current;

    expect(statCards[3].trend).toEqual({
      value: "Positivo",
      isPositive: true,
    });
  });

  it("should not include trend for monthly sales when zero", () => {
    vi.mocked(useCRMLeads).mockReturnValue({
      stats: { total: 30, qualified: 15 },
      isLoading: false,
    } as any);

    vi.mocked(useCRMDeals).mockReturnValue({
      stats: { activeDeals: 10, pipelineValue: 20000, wonThisMonth: 0 },
      isLoading: false,
    } as any);

    const { statCards } = renderHook(() => useCRMStats()).result.current;

    expect(statCards[3].trend).toBeUndefined();
  });

  it("should return lead and deal stats", () => {
    const mockLeadStats = { total: 60, qualified: 30 };
    const mockDealStats = { activeDeals: 18, pipelineValue: 45000, wonThisMonth: 18000 };

    vi.mocked(useCRMLeads).mockReturnValue({
      stats: mockLeadStats,
      isLoading: false,
    } as any);

    vi.mocked(useCRMDeals).mockReturnValue({
      stats: mockDealStats,
      isLoading: false,
    } as any);

    const { leadStats, dealStats } = renderHook(() => useCRMStats()).result.current;

    expect(leadStats).toEqual(mockLeadStats);
    expect(dealStats).toEqual(mockDealStats);
  });
});
