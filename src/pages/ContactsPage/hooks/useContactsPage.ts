import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCRMContacts, useCRMInteractions } from "../../../hooks/useCRMContacts";
import type { Contact } from "@gaqno-development/types/crm";

export function useContactsPage() {
  const [searchParams] = useSearchParams();
  const companyFromUrl = searchParams.get("company") ?? "";
  const [search, setSearch] = useState(companyFromUrl);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (companyFromUrl) setSearch(companyFromUrl);
  }, [companyFromUrl]);

  const { contacts, isLoading: isLoadingContacts } = useCRMContacts({
    search: search || companyFromUrl,
  });
  const { interactions, isLoading: isLoadingInteractions } =
    useCRMInteractions(selectedContact?.id);

  return {
    contacts,
    isLoadingContacts,
    search,
    setSearch,
    selectedContact,
    setSelectedContact,
    interactions,
    isLoadingInteractions,
  };
}
