import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMInvoices } from "./hooks/useCRMInvoices";
import { INVOICES_COLUMNS } from "./components/FinanceListColumns";

export default function InvoicesPage() {
  const { invoices, isLoading, search, setSearch } = useCRMInvoices();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Faturas</CardTitle>
          <p className="text-sm text-muted-foreground">
            Faturas emitidas e seu status.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número ou contato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={INVOICES_COLUMNS}
            data={{ data: invoices, isLoading }}
            showPagination={invoices.length > 10}
            emptyMessage="Nenhuma fatura encontrada."
          />
        </CardContent>
      </Card>
    </div>
  );
}
