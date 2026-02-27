import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMContracts } from "./hooks/useCRMContracts";
import { CONTRACTS_COLUMNS } from "./components/SalesListColumns";

export default function ContractsPage() {
  const { contracts, isLoading, search, setSearch } = useCRMContracts();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contratos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Contratos vinculados a contatos e oportunidades.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou contato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={CONTRACTS_COLUMNS}
            data={{ data: contracts, isLoading }}
            showPagination={contracts.length > 10}
            emptyMessage="Nenhum contrato encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
