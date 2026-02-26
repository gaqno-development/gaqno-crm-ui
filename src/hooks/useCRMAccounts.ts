import { useMemo, useState } from "react";
import { useCRMContacts } from "./useCRMContacts";

const NO_COMPANY_LABEL = "Sem empresa";

export interface AccountItem {
  companyName: string;
  contactCount: number;
  contactIds: string[];
}

export function useCRMAccounts() {
  const [search, setSearch] = useState("");
  const { contacts, isLoading } = useCRMContacts({});

  const accounts = useMemo<AccountItem[]>(() => {
    const byCompany = new Map<string, string[]>();
    for (const c of contacts) {
      const name = (c.company?.trim() || NO_COMPANY_LABEL).trim() || NO_COMPANY_LABEL;
      const ids = byCompany.get(name) ?? [];
      ids.push(c.id);
      byCompany.set(name, ids);
    }
    const list: AccountItem[] = [];
    byCompany.forEach((contactIds, companyName) => {
      list.push({ companyName, contactCount: contactIds.length, contactIds });
    });
    list.sort((a, b) => a.companyName.localeCompare(b.companyName, "pt-BR"));

    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter((a) => a.companyName.toLowerCase().includes(q));
  }, [contacts, search]);

  return { accounts, isLoading, search, setSearch };
}
