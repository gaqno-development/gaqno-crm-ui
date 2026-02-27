import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMSupportTickets } from "./hooks/useCRMSupportTickets";
import { SUPPORT_TICKETS_COLUMNS } from "./components/CustomersListColumns";

export default function SupportTicketsPage() {
  const { tickets, isLoading, search, setSearch } = useCRMSupportTickets();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Chamados de suporte</CardTitle>
          <p className="text-sm text-muted-foreground">
            Tickets de suporte vinculados a contatos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por assunto ou contato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={SUPPORT_TICKETS_COLUMNS}
            data={{ data: tickets, isLoading }}
            showPagination={tickets.length > 10}
            emptyMessage="Nenhum chamado encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
