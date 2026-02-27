import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMWorkflows } from "./hooks/useCRMWorkflows";
import { WORKFLOWS_COLUMNS } from "./components/AutomationListColumns";

export default function WorkflowsPage() {
  const { workflows, isLoading, search, setSearch } = useCRMWorkflows();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Workflows</CardTitle>
          <p className="text-sm text-muted-foreground">
            Automações e fluxos de trabalho.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={WORKFLOWS_COLUMNS} data={{ data: workflows, isLoading }} showPagination={workflows.length > 10} emptyMessage="Nenhum workflow encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
