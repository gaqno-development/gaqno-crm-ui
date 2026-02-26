import { useState, useMemo } from "react";
import { useCRMInteractions } from "./useCRMContacts";
import type { Interaction } from "../types/crm";

export function useCRMFilteredInteractions(contactId?: string) {
  const [search, setSearch] = useState("");
  const { interactions: allInteractions, isLoading } = useCRMInteractions(contactId);

  const filteredInteractions = useMemo(() => {
    return allInteractions
      .filter((i: Interaction) => {
        return (
          !search ||
          i.contactName?.toLowerCase().includes(search.toLowerCase()) ||
          i.summary.toLowerCase().includes(search.toLowerCase()) ||
          i.body?.toLowerCase().includes(search.toLowerCase())
        );
      })
      .sort(
        (a: Interaction, b: Interaction) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [allInteractions, search]);

  return {
    interactions: filteredInteractions,
    isLoading,
    search,
    setSearch,
  };
}
