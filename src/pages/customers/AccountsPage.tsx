import {
  Input,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@gaqno-development/frontcore/components";
import { EmptyState } from "@gaqno-development/frontcore/components/ui";
import { UsersIcon } from "@gaqno-development/frontcore/components/icons";
import { Search, Loader2 } from "lucide-react";
import { useCRMAccounts } from "../../hooks/useCRMAccounts";
import { AccountListItem } from "./AccountListItem";

export default function AccountsPage() {
  const { accounts, isLoading, search, setSearch } = useCRMAccounts();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Accounts (Companies)</CardTitle>
          <CardDescription>
            Companies derived from your contacts. Click to view contacts for that company.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome da empresa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && (
            <div className="grid gap-2">
              {accounts.map((account) => (
                <AccountListItem key={account.companyName} account={account} />
              ))}
              {accounts.length === 0 && (
                <EmptyState
                  icon={UsersIcon}
                  title="Nenhuma empresa encontrada"
                  description="Adicione o campo Empresa nos contatos para que apareçam aqui."
                  size="sm"
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
