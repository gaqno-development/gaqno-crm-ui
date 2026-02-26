import { renderHook, act } from "@testing-library/react";
import { useCRMContacts } from "../useCRMContacts";
import { MOCK_CONTACTS, MOCK_INTERACTIONS } from "../../lib/crm-mock-data";

describe("useCRMContacts", () => {
  it("returns all contacts with no search", () => {
    const { result } = renderHook(() => useCRMContacts({}));
    expect(result.current.contacts).toHaveLength(MOCK_CONTACTS.length);
    expect(result.current.isLoading).toBe(false);
  });

  it("filters contacts by name (case-insensitive)", () => {
    const { result } = renderHook(() => useCRMContacts({ search: "JULIANA" }));
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts[0].name).toBe("Juliana Alves");
  });

  it("filters contacts by email", () => {
    const { result } = renderHook(() =>
      useCRMContacts({ search: "eshopbrasil" })
    );
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts[0].email).toBe("sofia@eshopbrasil.com");
  });

  it("filters contacts by company", () => {
    const { result } = renderHook(() =>
      useCRMContacts({ search: "Logística" })
    );
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts[0].company).toBe("Logística Express SA");
  });

  it("returns empty array when search has no match", () => {
    const { result } = renderHook(() =>
      useCRMContacts({ search: "zzznocontact" })
    );
    expect(result.current.contacts).toHaveLength(0);
  });

  it("getInteractionsForContact returns interactions for the correct contact", () => {
    const { result } = renderHook(() => useCRMContacts({}));
    const contactWithInteractions = MOCK_CONTACTS.find((c) =>
      MOCK_INTERACTIONS.some((i) => i.contactId === c.id)
    );
    if (!contactWithInteractions) throw new Error("No contact with interactions in mock data");

    const interactions = result.current.getInteractionsForContact(
      contactWithInteractions.id
    );
    expect(interactions.length).toBeGreaterThan(0);
    interactions.forEach((i) =>
      expect(i.contactId).toBe(contactWithInteractions.id)
    );
  });

  it("getInteractionsForContact returns interactions sorted newest first", () => {
    const { result } = renderHook(() => useCRMContacts({}));
    const contactId = MOCK_CONTACTS[0].id; // c1 with multiple interactions
    const interactions = result.current.getInteractionsForContact(contactId);
    for (let i = 1; i < interactions.length; i++) {
      expect(new Date(interactions[i - 1].createdAt).getTime()).toBeGreaterThanOrEqual(
        new Date(interactions[i].createdAt).getTime()
      );
    }
  });

  it("getInteractionsForContact returns empty array for unknown contact", () => {
    const { result } = renderHook(() => useCRMContacts({}));
    const interactions = result.current.getInteractionsForContact("non-existent-id");
    expect(interactions).toHaveLength(0);
  });
});
