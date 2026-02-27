import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMApiKeys } from "./hooks/useCRMApiKeys";
import { API_KEYS_COLUMNS } from "./components/SettingsListColumns";

export default function ApiKeysPage() {
  const { apiKeys, isLoading, search, setSearch } = useCRMApiKeys();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Chaves de API</CardTitle>
          <p className="text-sm text-muted-foreground">
            Chaves para integração via API.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou prefixo..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={API_KEYS_COLUMNS} data={{ data: apiKeys, isLoading }} showPagination={apiKeys.length > 10} emptyMessage="Nenhuma chave de API encontrada." />
        </CardContent>
      </Card>
    </div>
  );
}
