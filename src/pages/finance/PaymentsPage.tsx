import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMPayments } from "./hooks/useCRMPayments";
import { PAYMENTS_COLUMNS } from "./components/FinanceListColumns";

export default function PaymentsPage() {
  const { payments, isLoading, search, setSearch } = useCRMPayments();

  return (
    <ListPageLayout
      title="Pagamentos"
      description="Pagamentos recebidos e vinculados a faturas."
      searchPlaceholder="Buscar por fatura..."
      emptyMessage="Nenhum pagamento encontrado."
      columns={PAYMENTS_COLUMNS}
      data={payments}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
