import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMCustomFields } from "./hooks/useCRMCustomFields";
import { CUSTOM_FIELDS_COLUMNS } from "./components/SettingsListColumns";

export default function CustomFieldsPage() {
  const { fields, isLoading, search, setSearch } = useCRMCustomFields();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Campos personalizados</CardTitle>
          <p className="text-sm text-muted-foreground">
            Campos customizados por entidade (lead, contato, deal, etc.).
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou entidade..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={CUSTOM_FIELDS_COLUMNS} data={{ data: fields, isLoading }} showPagination={fields.length > 10} emptyMessage="Nenhum campo personalizado encontrado." />
        </CardContent>
      </Card>
    </div>
  );
}
