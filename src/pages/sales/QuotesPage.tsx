import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMQuotes } from "./hooks/useCRMQuotes";
import { QUOTES_COLUMNS } from "./components/SalesListColumns";

export default function QuotesPage() {
  const { quotes, isLoading, search, setSearch } = useCRMQuotes();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Cotações</CardTitle>
          <p className="text-sm text-muted-foreground">
            Cotações enviadas a contatos e oportunidades.
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
            columns={QUOTES_COLUMNS}
            data={{ data: quotes, isLoading }}
            showPagination={quotes.length > 10}
            emptyMessage="Nenhuma cotação encontrada."
          />
        </CardContent>
      </Card>
    </div>
  );
}
