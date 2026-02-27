import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMIntegrations } from "./hooks/useCRMIntegrations";
import { INTEGRATIONS_COLUMNS } from "./components/AutomationListColumns";

export default function IntegrationsPage() {
  const { integrations, isLoading, search, setSearch } = useCRMIntegrations();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <p className="text-sm text-muted-foreground">
            Integrações com serviços externos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={INTEGRATIONS_COLUMNS} data={{ data: integrations, isLoading }} showPagination={integrations.length > 10} emptyMessage="Nenhuma integração encontrada." />
        </CardContent>
      </Card>
    </div>
  );
}
