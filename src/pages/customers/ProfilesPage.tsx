import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMCustomerProfiles } from "./hooks/useCRMCustomerProfiles";
import { PROFILES_COLUMNS } from "./components/CustomersListColumns";

export default function ProfilesPage() {
  const { profiles, isLoading, search, setSearch } = useCRMCustomerProfiles();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Perfis de clientes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Perfis consolidados de clientes e segmentos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, e-mail ou empresa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={PROFILES_COLUMNS}
            data={{ data: profiles, isLoading }}
            showPagination={profiles.length > 10}
            emptyMessage="Nenhum perfil de cliente encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
