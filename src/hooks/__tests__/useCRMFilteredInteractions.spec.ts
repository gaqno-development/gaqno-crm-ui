import { renderHook, act, waitFor } from "@testing-library/react";
import { useCRMFilteredInteractions } from "../useCRMFilteredInteractions";
import { createQueryClientWrapper } from "../../test/test-utils";

const wrapper = createQueryClientWrapper();

describe("useCRMFilteredInteractions", () => {
  it("returns interactions and search state", async () => {
    const { result } = renderHook(() => useCRMFilteredInteractions(), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(Array.isArray(result.current.interactions)).toBe(true);
    expect(result.current.search).toBe("");
    act(() => result.current.setSearch("test"));
    expect(result.current.search).toBe("test");
  });
});
