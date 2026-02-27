import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMPipelines } from "./hooks/useCRMPipelines";
import { PIPELINES_COLUMNS } from "./components/SettingsListColumns";

export default function PipelinesPage() {
  const { pipelines, isLoading, search, setSearch } = useCRMPipelines();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pipelines</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pipelines de vendas e estágios.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={PIPELINES_COLUMNS} data={{ data: pipelines, isLoading }} showPagination={pipelines.length > 10} emptyMessage="Nenhum pipeline encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
