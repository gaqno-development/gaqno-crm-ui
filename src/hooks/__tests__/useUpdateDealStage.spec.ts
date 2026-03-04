import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useUpdateDealStage } from "../useUpdateDealStage";
import { vi } from "vitest";
import type { Deal } from "../../types/crm";

const updatedDeal: Deal = {
  id: "d2",
  name: "Saúde e Bem-Estar — Starter Plan",
  contactId: "c2",
  contactName: "Juliana Alves",
  company: "Saúde e Bem-Estar Ltda",
  value: 12000,
  currency: "BRL",
  stage: "won",
  probability: 100,
  closingDate: "2026-03-15T00:00:00Z",
  ownerId: "u1",
  ownerName: "Carlos Silva",
  createdAt: "2026-02-12T00:00:00Z",
  updatedAt: "2026-02-26T00:00:00Z",
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return {
    queryClient,
    wrapper: function Wrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(QueryClientProvider, { client: queryClient }, children);
    },
  };
}

describe("useUpdateDealStage", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const { coreAxiosClient } = await import("@gaqno-development/frontcore/utils/api");
    vi.mocked(coreAxiosClient.crm.patch).mockResolvedValue({ data: updatedDeal });
  });

  it("should call PATCH /deals/:id with stage when updateDealStage is invoked", async () => {
    const { coreAxiosClient } = await import("@gaqno-development/frontcore/utils/api");
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useUpdateDealStage(), { wrapper });

    result.current.updateDealStage("d2", "won");

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(coreAxiosClient.crm.patch).toHaveBeenCalledWith("/deals/d2", { stage: "won" });
  });

  it("should invalidate crm deals query on success", async () => {
    const { queryClient, wrapper } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useUpdateDealStage(), { wrapper });
    result.current.updateDealStage("d2", "won");

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["crm", "deals"] });
  });

  it("should set isPending to false after mutation completes", async () => {
    const { coreAxiosClient } = await import("@gaqno-development/frontcore/utils/api");
    vi.mocked(coreAxiosClient.crm.patch).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: updatedDeal }), 20))
    );

    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useUpdateDealStage(), { wrapper });
    result.current.updateDealStage("d2", "lost");

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
    expect(coreAxiosClient.crm.patch).toHaveBeenCalledWith("/deals/d2", { stage: "lost" });
  });
});
