import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMTriggers } from "./hooks/useCRMTriggers";
import { TRIGGERS_COLUMNS } from "./components/AutomationListColumns";

export default function TriggersPage() {
  const { triggers, isLoading, search, setSearch } = useCRMTriggers();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gatilhos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Gatilhos por evento para automação.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={TRIGGERS_COLUMNS} data={{ data: triggers, isLoading }} showPagination={triggers.length > 10} emptyMessage="Nenhum gatilho encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
