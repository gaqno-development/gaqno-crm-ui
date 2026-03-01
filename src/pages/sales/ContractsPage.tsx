import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMContracts } from "./hooks/useCRMContracts";
import { CONTRACTS_COLUMNS } from "./components/SalesListColumns";

export default function ContractsPage() {
  const { contracts, isLoading, search, setSearch } = useCRMContracts();

  return (
    <ListPageLayout
      title="Contratos"
      description="Contratos vinculados a contatos e oportunidades."
      searchPlaceholder="Buscar por título ou contato..."
      emptyMessage="Nenhum contrato encontrado."
      columns={CONTRACTS_COLUMNS}
      data={contracts}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
