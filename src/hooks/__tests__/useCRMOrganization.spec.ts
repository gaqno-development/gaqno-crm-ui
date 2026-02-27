import { renderHook, waitFor } from "@testing-library/react";
import { useCRMOrganization } from "../../pages/settings/hooks/useCRMOrganization";
import { createQueryClientWrapper } from "../../test/test-utils";

const wrapper = createQueryClientWrapper();

describe("useCRMOrganization", () => {
  it("returns organization from API", async () => {
    const { result } = renderHook(() => useCRMOrganization(), { wrapper });
    await waitFor(() => {
      expect(result.current.organization).not.toBeNull();
    });
    expect(result.current.organization?.id).toBeDefined();
    expect(result.current.organization?.name).toBe("Org");
    expect(result.current.organization?.updatedAt).toBeDefined();
  });

  it("exposes isLoading", () => {
    const { result } = renderHook(() => useCRMOrganization(), { wrapper });
    expect(typeof result.current.isLoading).toBe("boolean");
  });
});
