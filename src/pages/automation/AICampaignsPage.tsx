import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMAICampaigns } from "./hooks/useCRMAICampaigns";
import { AI_CAMPAIGNS_COLUMNS } from "./components/AutomationListColumns";

export default function AICampaignsPage() {
  const { campaigns, isLoading, search, setSearch } = useCRMAICampaigns();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Campanhas de IA</CardTitle>
          <p className="text-sm text-muted-foreground">
            Campanhas automatizadas com IA.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={AI_CAMPAIGNS_COLUMNS} data={{ data: campaigns, isLoading }} showPagination={campaigns.length > 10} emptyMessage="Nenhuma campanha encontrada." />
        </CardContent>
      </Card>
    </div>
  );
}
