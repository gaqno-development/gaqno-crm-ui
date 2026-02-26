import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { InitialsAvatar } from "@gaqno-development/frontcore/components/ui";
import { getInitials } from "@gaqno-development/frontcore/utils";
import type { AccountItem } from "../../hooks/useCRMAccounts";

const NO_COMPANY_LABEL = "Sem empresa";

function companyInitials(companyName: string): string {
  if (companyName === NO_COMPANY_LABEL) return "—";
  return getInitials(companyName) || "?";
}

export interface AccountListItemProps {
  account: AccountItem;
}

export function AccountListItem({ account }: AccountListItemProps) {
  const href =
    account.companyName === NO_COMPANY_LABEL
      ? "/crm/customers/contacts"
      : `/crm/customers/contacts?company=${encodeURIComponent(account.companyName)}`;

  return (
    <Link
      to={href}
      className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 text-left hover:bg-muted/40 hover:border-primary/30 transition-all group"
    >
      <InitialsAvatar initials={companyInitials(account.companyName)} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{account.companyName}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {account.contactCount}{" "}
          {account.contactCount === 1 ? "contato" : "contatos"}
        </p>
      </div>
      <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
}
