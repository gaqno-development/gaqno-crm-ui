import { useMemo } from "react";
import { useCRMContacts } from "../../../hooks/useCRMContacts";
import { useCRMInteractions } from "../../../hooks/useCRMContacts";
import type { ContactTag, InteractionType } from "../../../types/crm";

export interface ByTagRow {
  tag: string;
  label: string;
  count: number;
}

export interface ByTypeRow {
  type: string;
  label: string;
  count: number;
}

const TAG_LABELS: Record<ContactTag, string> = {
  vip: "VIP",
  partner: "Parceiro",
  churned: "Churn",
  prospect: "Prospect",
  customer: "Cliente",
};

const TYPE_LABELS: Record<InteractionType, string> = {
  whatsapp: "WhatsApp",
  email: "E-mail",
  phone: "Telefone",
  note: "Nota",
  meeting: "Reunião",
};

export function useCustomerInsightsPage() {
  const { contacts, isLoading: isLoadingContacts } = useCRMContacts();
  const { interactions, isLoading: isLoadingInteractions } = useCRMInteractions();

  const isLoading = isLoadingContacts || isLoadingInteractions;

  const byTag = useMemo<ByTagRow[]>(() => {
    const counts: Record<string, number> = {};
    for (const c of contacts) {
      const tags = c.tags ?? [];
      if (tags.length === 0) {
        counts["none"] = (counts["none"] ?? 0) + 1;
      } else {
        for (const t of tags) {
          counts[t] = (counts[t] ?? 0) + 1;
        }
      }
    }
    return (Object.entries(counts) as [ContactTag | "none", number][]).map(([tag, count]) => ({
      tag,
      label: tag === "none" ? "Sem tag" : TAG_LABELS[tag as ContactTag],
      count,
    }));
  }, [contacts]);

  const byType = useMemo<ByTypeRow[]>(() => {
    const counts: Record<string, number> = {};
    for (const i of interactions) {
      const t = i.type ?? "note";
      counts[t] = (counts[t] ?? 0) + 1;
    }
    return (Object.entries(counts) as [InteractionType, number][]).map(([type, count]) => ({
      type,
      label: TYPE_LABELS[type],
      count,
    }));
  }, [interactions]);

  return {
    totalContacts: contacts.length,
    totalInteractions: interactions.length,
    byTag,
    byType,
    isLoading,
  };
}
