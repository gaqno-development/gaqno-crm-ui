import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMAuditLogs } from "./hooks/useCRMAuditLogs";
import { AUDIT_LOGS_COLUMNS } from "./components/AdministrationListColumns";

export default function AuditLogsPage() {
  const { logs, isLoading, search, setSearch } = useCRMAuditLogs();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Log de auditoria</CardTitle>
          <p className="text-sm text-muted-foreground">
            Histórico de ações no sistema.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por ação, usuário ou entidade..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={AUDIT_LOGS_COLUMNS} data={{ data: logs, isLoading }} showPagination={logs.length > 10} emptyMessage="Nenhum registro de auditoria encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
