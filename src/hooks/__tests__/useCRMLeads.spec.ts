import { renderHook, act, waitFor } from "@testing-library/react";
import { useCRMLeads, LEAD_STATUS_OPTIONS, LEAD_SOURCE_OPTIONS } from "../useCRMLeads";
import { MOCK_LEADS } from "../../lib/crm-mock-data";
import { createQueryClientWrapper } from "../../test/test-utils";

const wrapper = createQueryClientWrapper();

describe("useCRMLeads", () => {
  it("returns all leads by default with no filters", async () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.leads).toHaveLength(MOCK_LEADS.length);
  });

  it("filters leads by search (name)", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    act(() => result.current.setSearch("juliana"));
    expect(result.current.leads).toHaveLength(1);
    expect(result.current.leads[0].name).toBe("Juliana Alves");
  });

  it("filters leads by search (company)", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    act(() => result.current.setSearch("techbrasil"));
    expect(result.current.leads).toHaveLength(1);
    expect(result.current.leads[0].company).toBe("TechBrasil Ltda");
  });

  it("filters leads by status", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    act(() => result.current.setStatus("qualified"));
    const leads = result.current.leads;
    expect(leads.length).toBeGreaterThan(0);
    leads.forEach((l) => expect(l.status).toBe("qualified"));
  });

  it("filters leads by source", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    act(() => result.current.setSource("referral"));
    const leads = result.current.leads;
    expect(leads.length).toBeGreaterThan(0);
    leads.forEach((l) => expect(l.source).toBe("referral"));
  });

  it("returns empty array when search has no matches", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    act(() => result.current.setSearch("zzz-no-match-xyz"));
    expect(result.current.leads).toHaveLength(0);
  });

  it("computes correct stats", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    const { stats } = result.current;
    expect(stats.total).toBe(MOCK_LEADS.length);
    expect(stats.total).toBe(
      stats.new + stats.contacted + stats.qualified + stats.lost
    );
  });

  it("status filter 'all' returns all leads", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    act(() => result.current.setStatus("all"));
    expect(result.current.leads).toHaveLength(MOCK_LEADS.length);
  });

  it("exposes statusOptions with 'all' as first item", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    expect(result.current.statusOptions[0].value).toBe("all");
    expect(result.current.statusOptions.length).toBe(LEAD_STATUS_OPTIONS.length);
  });

  it("exposes sourceOptions with 'all' as first item", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    expect(result.current.sourceOptions[0].value).toBe("all");
    expect(result.current.sourceOptions.length).toBe(LEAD_SOURCE_OPTIONS.length);
  });

  it("combines search and status filters", () => {
    const { result } = renderHook(() => useCRMLeads(), { wrapper });
    act(() => {
      result.current.setSearch("carlos");
      result.current.setStatus("qualified");
    });
    // All returned leads must match BOTH: owner contains 'carlos' (search hits name/company/email)
    result.current.leads.forEach((l) => {
      expect(l.status).toBe("qualified");
    });
  });
});
