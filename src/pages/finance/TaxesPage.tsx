import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMTaxes } from "./hooks/useCRMTaxes";
import { TAXES_COLUMNS } from "./components/FinanceListColumns";

export default function TaxesPage() {
  const { taxes, isLoading, search, setSearch } = useCRMTaxes();

  return (
    <ListPageLayout
      title="Impostos"
      description="Configuração de impostos e alíquotas."
      searchPlaceholder="Buscar por nome..."
      emptyMessage="Nenhum imposto encontrado."
      columns={TAXES_COLUMNS}
      data={taxes}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
