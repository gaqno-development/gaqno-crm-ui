import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Contact, Interaction } from "../types/crm";

interface UseCRMContactsParams {
  search?: string;
}

export function useCRMContacts(params: UseCRMContactsParams = {}) {
  const { search = "" } = params;
  const queryClient = useQueryClient();

  const { data: contactsData = [], isLoading } = useQuery({
    queryKey: ["crm", "contacts"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Contact[]>("/contacts");
      return data;
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (newContact: Partial<Contact>) => {
      const { data } = await coreAxiosClient.crm.post<Contact>("/contacts", newContact);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crm", "contacts"] });
    },
  });

  const contacts = useMemo<Contact[]>(() => {
    return contactsData.filter((contact: Contact) => {
      return (
        !search ||
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email?.toLowerCase().includes(search.toLowerCase()) ||
        (contact.company?.toLowerCase().includes(search.toLowerCase()) ?? false)
      );
    });
  }, [contactsData, search]);

  return { 
    contacts, 
    isLoading,
    createContact: createContactMutation.mutateAsync,
    isCreating: createContactMutation.isPending,
  };
}

export function useCRMInteractions(contactId?: string) {
  const queryClient = useQueryClient();
  
  const { data: interactions = [], isLoading } = useQuery({
    queryKey: ["crm", "interactions", contactId],
    queryFn: async () => {
      const url = contactId ? `/interactions?contactId=${contactId}` : "/interactions";
      const { data } = await coreAxiosClient.crm.get<Interaction[]>(url);
      return data;
    },
    enabled: !!contactId || !contactId, // Fetch all if no contactId, or specifically for one
  });

  const createInteractionMutation = useMutation({
    mutationFn: async (newInteraction: any) => {
      const { data } = await coreAxiosClient.crm.post<Interaction>("/interactions", newInteraction);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crm", "interactions"] });
    },
  });

  return {
    interactions,
    isLoading,
    createInteraction: createInteractionMutation.mutateAsync,
    isCreating: createInteractionMutation.isPending,
  };
}
