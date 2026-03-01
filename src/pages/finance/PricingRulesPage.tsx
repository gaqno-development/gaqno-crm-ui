import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMPricingRules } from "./hooks/useCRMPricingRules";
import { PRICING_RULES_COLUMNS } from "./components/FinanceListColumns";

export default function PricingRulesPage() {
  const { rules, isLoading, search, setSearch } = useCRMPricingRules();

  return (
    <ListPageLayout
      title="Regras de preço"
      description="Regras de precificação e descontos."
      searchPlaceholder="Buscar por nome..."
      emptyMessage="Nenhuma regra de preço encontrada."
      columns={PRICING_RULES_COLUMNS}
      data={rules}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
