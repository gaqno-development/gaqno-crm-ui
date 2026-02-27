import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMUsers } from "./hooks/useCRMUsers";
import { USERS_COLUMNS } from "./components/AdministrationListColumns";

export default function UsersPage() {
  const { users, isLoading, search, setSearch } = useCRMUsers();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <p className="text-sm text-muted-foreground">
            Usuários do CRM e suas funções.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou e-mail..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={USERS_COLUMNS} data={{ data: users, isLoading }} showPagination={users.length > 10} emptyMessage="Nenhum usuário encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
