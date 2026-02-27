import { renderHook, waitFor } from "@testing-library/react";
import { useCRMDeals } from "../useCRMDeals";
import { MOCK_DEALS } from "../../lib/crm-mock-data";
import { createQueryClientWrapper } from "../../test/test-utils";

const wrapper = createQueryClientWrapper();
const ACTIVE_STAGES = ["prospecting", "qualification", "proposal", "negotiation"] as const;

describe("useCRMDeals", () => {
  it("returns all deals", async () => {
    const { result } = renderHook(() => useCRMDeals(), { wrapper });
    await waitFor(() => {
      expect(result.current.deals).toHaveLength(MOCK_DEALS.length);
    });
    expect(result.current.deals).toHaveLength(MOCK_DEALS.length);
  });

  it("groups deals correctly by stage", () => {
    const { result } = renderHook(() => useCRMDeals(), { wrapper });
    const { dealsByStage } = result.current;

    MOCK_DEALS.forEach((deal) => {
      expect(dealsByStage[deal.stage]).toContainEqual(deal);
    });
  });

  it("stageOrder contains all 6 stages", () => {
    const { result } = renderHook(() => useCRMDeals(), { wrapper });
    expect(result.current.stageOrder).toHaveLength(6);
    expect(result.current.stageOrder).toContain("prospecting");
    expect(result.current.stageOrder).toContain("won");
    expect(result.current.stageOrder).toContain("lost");
  });

  it("calculates pipelineValue from active stages only (excludes won/lost)", () => {
    const expectedPipelineValue = MOCK_DEALS.filter((d) =>
      ACTIVE_STAGES.includes(d.stage as (typeof ACTIVE_STAGES)[number])
    ).reduce((sum, d) => sum + d.value, 0);

    const { result } = renderHook(() => useCRMDeals(), { wrapper });
    expect(result.current.stats.pipelineValue).toBe(expectedPipelineValue);
  });

  it("calculates wonThisMonth from won deals", () => {
    const expected = MOCK_DEALS.filter((d) => d.stage === "won").reduce(
      (sum, d) => sum + d.value,
      0
    );
    const { result } = renderHook(() => useCRMDeals(), { wrapper });
    expect(result.current.stats.wonThisMonth).toBe(expected);
  });

  it("activeDeals count excludes won and lost", () => {
    const { result } = renderHook(() => useCRMDeals(), { wrapper });
    const countActive = MOCK_DEALS.filter(
      (d) => d.stage !== "won" && d.stage !== "lost"
    ).length;
    expect(result.current.stats.activeDeals).toBe(countActive);
  });

  it("totalDeals equals MOCK_DEALS length", () => {
    const { result } = renderHook(() => useCRMDeals(), { wrapper });
    expect(result.current.stats.totalDeals).toBe(MOCK_DEALS.length);
  });

  it("does not mutate original MOCK_DEALS array", () => {
    const originalLength = MOCK_DEALS.length;
    renderHook(() => useCRMDeals(), { wrapper });
    expect(MOCK_DEALS).toHaveLength(originalLength);
  });
});
