import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMTaxes } from "./hooks/useCRMTaxes";
import { TAXES_COLUMNS } from "./components/FinanceListColumns";

export default function TaxesPage() {
  const { taxes, isLoading, search, setSearch } = useCRMTaxes();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Impostos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configuração de impostos e alíquotas.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={TAXES_COLUMNS}
            data={{ data: taxes, isLoading }}
            showPagination={taxes.length > 10}
            emptyMessage="Nenhum imposto encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
