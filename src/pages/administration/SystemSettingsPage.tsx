import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMSystemSettings } from "./hooks/useCRMSystemSettings";
import { SYSTEM_SETTINGS_COLUMNS } from "./components/AdministrationListColumns";

export default function SystemSettingsPage() {
  const { settings, isLoading, search, setSearch } = useCRMSystemSettings();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do sistema</CardTitle>
          <p className="text-sm text-muted-foreground">
            Parâmetros e configurações gerais do CRM.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por chave..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={SYSTEM_SETTINGS_COLUMNS} data={{ data: settings, isLoading }} showPagination={settings.length > 10} emptyMessage="Nenhuma configuração encontrada." />
        </CardContent>
      </Card>
    </div>
  );
}
