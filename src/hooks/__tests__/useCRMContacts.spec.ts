import { renderHook, waitFor } from "@testing-library/react";
import { useCRMContacts } from "../useCRMContacts";
import { MOCK_CONTACTS } from "../../lib/crm-mock-data";
import { createQueryClientWrapper } from "../../test/test-utils";

const wrapper = createQueryClientWrapper();

describe("useCRMContacts", () => {
  it("returns all contacts with no search", async () => {
    const { result } = renderHook(() => useCRMContacts({}), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.contacts).toHaveLength(MOCK_CONTACTS.length);
  });

  it("filters contacts by name (case-insensitive)", () => {
    const { result } = renderHook(() => useCRMContacts({ search: "JULIANA" }), {
      wrapper,
    });
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts[0].name).toBe("Juliana Alves");
  });

  it("filters contacts by email", () => {
    const { result } = renderHook(
      () => useCRMContacts({ search: "eshopbrasil" }),
      { wrapper }
    );
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts[0].email).toBe("sofia@eshopbrasil.com");
  });

  it("filters contacts by company", () => {
    const { result } = renderHook(
      () => useCRMContacts({ search: "Logística" }),
      { wrapper }
    );
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts[0].company).toBe("Logística Express SA");
  });

  it("returns empty array when search has no match", () => {
    const { result } = renderHook(
      () => useCRMContacts({ search: "zzznocontact" }),
      { wrapper }
    );
    expect(result.current.contacts).toHaveLength(0);
  });
});
