import { renderHook, act, waitFor } from "@testing-library/react";
import { useCRMInvoices } from "../../pages/finance/hooks/useCRMInvoices";
import { createQueryClientWrapper } from "../../test/test-utils";

const wrapper = createQueryClientWrapper();

describe("useCRMInvoices", () => {
  it("returns empty invoices list from API", async () => {
    const { result } = renderHook(() => useCRMInvoices(), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.invoices).toEqual([]);
  });

  it("updates search and filters invoices", () => {
    const { result } = renderHook(() => useCRMInvoices(), { wrapper });
    act(() => result.current.setSearch("INV-001"));
    expect(result.current.search).toBe("INV-001");
    expect(result.current.invoices).toEqual([]);
  });
});
