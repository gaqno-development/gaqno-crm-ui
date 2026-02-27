import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMPricingRules } from "./hooks/useCRMPricingRules";
import { PRICING_RULES_COLUMNS } from "./components/FinanceListColumns";

export default function PricingRulesPage() {
  const { rules, isLoading, search, setSearch } = useCRMPricingRules();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Regras de preço</CardTitle>
          <p className="text-sm text-muted-foreground">
            Regras de precificação e descontos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={PRICING_RULES_COLUMNS}
            data={{ data: rules, isLoading }}
            showPagination={rules.length > 10}
            emptyMessage="Nenhuma regra de preço encontrada."
          />
        </CardContent>
      </Card>
    </div>
  );
}
