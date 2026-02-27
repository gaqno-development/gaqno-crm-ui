import { renderHook, act, waitFor } from "@testing-library/react";
import { useCRMWorkflows } from "../../pages/automation/hooks/useCRMWorkflows";
import { createQueryClientWrapper } from "../../test/test-utils";

const wrapper = createQueryClientWrapper();

describe("useCRMWorkflows", () => {
  it("returns empty workflows list from API", async () => {
    const { result } = renderHook(() => useCRMWorkflows(), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.workflows).toEqual([]);
  });

  it("filters workflows by search when set", () => {
    const { result } = renderHook(() => useCRMWorkflows(), { wrapper });
    act(() => result.current.setSearch("test"));
    expect(result.current.search).toBe("test");
    expect(result.current.workflows).toEqual([]);
  });
});
