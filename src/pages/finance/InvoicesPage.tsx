import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMInvoices } from "./hooks/useCRMInvoices";
import { INVOICES_COLUMNS } from "./components/FinanceListColumns";

export default function InvoicesPage() {
  const { invoices, isLoading, search, setSearch } = useCRMInvoices();

  return (
    <ListPageLayout
      title="Faturas"
      description="Faturas emitidas e seu status."
      searchPlaceholder="Buscar por número ou contato..."
      emptyMessage="Nenhuma fatura encontrada."
      columns={INVOICES_COLUMNS}
      data={invoices}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
