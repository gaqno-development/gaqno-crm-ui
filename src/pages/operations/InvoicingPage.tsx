import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMInvoicing } from "./hooks/useCRMInvoicing";
import { INVOICING_OPS_COLUMNS } from "./components/OperationsListColumns";

export default function InvoicingPage() {
  const { invoices, isLoading, search, setSearch } = useCRMInvoicing();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Faturamento</CardTitle>
          <p className="text-sm text-muted-foreground">
            Faturas e documentos fiscais.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por fatura ou contato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={INVOICING_OPS_COLUMNS}
            data={{ data: invoices, isLoading }}
            showPagination={invoices.length > 10}
            emptyMessage="Nenhuma fatura encontrada."
          />
        </CardContent>
      </Card>
    </div>
  );
}
