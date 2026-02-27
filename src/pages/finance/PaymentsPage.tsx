import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMPayments } from "./hooks/useCRMPayments";
import { PAYMENTS_COLUMNS } from "./components/FinanceListColumns";

export default function PaymentsPage() {
  const { payments, isLoading, search, setSearch } = useCRMPayments();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pagamentos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pagamentos recebidos e vinculados a faturas.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por fatura..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={PAYMENTS_COLUMNS}
            data={{ data: payments, isLoading }}
            showPagination={payments.length > 10}
            emptyMessage="Nenhum pagamento encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
