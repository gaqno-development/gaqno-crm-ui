import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMTeams } from "./hooks/useCRMTeams";
import { TEAMS_COLUMNS } from "./components/AdministrationListColumns";

export default function TeamsPage() {
  const { teams, isLoading, search, setSearch } = useCRMTeams();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Times</CardTitle>
          <p className="text-sm text-muted-foreground">
            Times e equipes do CRM.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={TEAMS_COLUMNS} data={{ data: teams, isLoading }} showPagination={teams.length > 10} emptyMessage="Nenhum time encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
