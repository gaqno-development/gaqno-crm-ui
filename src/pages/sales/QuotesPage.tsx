import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMQuotes } from "./hooks/useCRMQuotes";
import { QUOTES_COLUMNS } from "./components/SalesListColumns";

export default function QuotesPage() {
  const { quotes, isLoading, search, setSearch } = useCRMQuotes();

  return (
    <ListPageLayout
      title="Cotações"
      description="Cotações enviadas a contatos e oportunidades."
      searchPlaceholder="Buscar por título ou contato..."
      emptyMessage="Nenhuma cotação encontrada."
      columns={QUOTES_COLUMNS}
      data={quotes}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
