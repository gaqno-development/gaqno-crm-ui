import { useMemo } from "react";
import { useCRMDeals } from "../../../hooks/useCRMDeals";
import { useCRMContacts } from "../../../hooks/useCRMContacts";
import { useCRMInteractions } from "../../../hooks/useCRMContacts";
import type { Deal, Contact } from "../../../types/crm";

const STALE_DEAL_DAYS = 7;
const STALE_CONTACT_DAYS = 7;

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "deal" | "contact";
}

function parseDate(s: string): Date {
  const d = new Date(s);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

function daysAgo(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000));
}

export function useAlertsPage() {
  const { deals, isLoading: isLoadingDeals } = useCRMDeals();
  const { contacts, isLoading: isLoadingContacts } = useCRMContacts();
  const { interactions, isLoading: isLoadingInteractions } = useCRMInteractions();

  const isLoading = isLoadingDeals || isLoadingContacts || isLoadingInteractions;

  const alerts = useMemo<AlertItem[]>(() => {
    const list: AlertItem[] = [];

    const lastInteractionByContact = new Map<string, Date>();
    for (const i of interactions) {
      const existing = lastInteractionByContact.get(i.contactId);
      const created = parseDate(i.createdAt);
      if (!existing || created > existing) {
        lastInteractionByContact.set(i.contactId, created);
      }
    }

    for (const deal of deals as Deal[]) {
      if (deal.stage === "won" || deal.stage === "lost") continue;
      const updated = parseDate((deal as { updatedAt?: string }).updatedAt ?? (deal as { createdAt?: string }).createdAt ?? "");
      if (daysAgo(updated) >= STALE_DEAL_DAYS) {
        const contactName = (deal as { contactName?: string }).contactName ?? "—";
        list.push({
          id: `deal-${deal.id}`,
          title: `Oportunidade sem atualização: ${deal.name}`,
          description: `Em ${deal.stage} há ${daysAgo(updated)} dias. Contato: ${contactName}`,
          date: (deal as { updatedAt?: string }).updatedAt ?? (deal as { createdAt?: string }).createdAt ?? "",
          type: "deal",
        });
      }
    }

    for (const contact of contacts as Contact[]) {
      const last = lastInteractionByContact.get(contact.id);
      const ref = last ?? parseDate(contact.createdAt);
      if (daysAgo(ref) >= STALE_CONTACT_DAYS) {
        list.push({
          id: `contact-${contact.id}`,
          title: `Sem interação recente: ${contact.name}`,
          description: last
            ? `Última interação há ${daysAgo(ref)} dias.`
            : `Nenhuma interação registrada.`,
          date: last ? last.toISOString() : contact.createdAt,
          type: "contact",
        });
      }
    }

    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return list.slice(0, 50);
  }, [deals, contacts, interactions]);

  return { alerts, isLoading };
}
