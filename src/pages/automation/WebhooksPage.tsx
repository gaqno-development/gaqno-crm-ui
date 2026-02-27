import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMWebhooks } from "./hooks/useCRMWebhooks";
import { WEBHOOKS_COLUMNS } from "./components/AutomationListColumns";

export default function WebhooksPage() {
  const { webhooks, isLoading, search, setSearch } = useCRMWebhooks();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <p className="text-sm text-muted-foreground">
            URLs de callback para eventos do CRM.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por URL..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={WEBHOOKS_COLUMNS} data={{ data: webhooks, isLoading }} showPagination={webhooks.length > 10} emptyMessage="Nenhum webhook encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
