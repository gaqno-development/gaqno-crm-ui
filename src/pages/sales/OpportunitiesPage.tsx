import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DataTable,
} from "@gaqno-development/frontcore/components/ui";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import { Briefcase, DollarSign, TrendingUp, Trophy } from "lucide-react";
import { Search } from "lucide-react";
import { useOpportunitiesPage } from "./hooks/useOpportunitiesPage";
import { OPPORTUNITIES_COLUMNS } from "./components/OpportunitiesConstants";
import type { DealStage } from "../../types/crm";

export default function OpportunitiesPage() {
  const {
    deals,
    isLoading,
    search,
    setSearch,
    stage,
    setStage,
    stageOptions,
    stats,
  } = useOpportunitiesPage();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Oportunidades ativas",
            value: stats.activeDeals,
            icon: Briefcase,
            color: "text-primary",
          },
          {
            label: "Valor em pipeline",
            value: formatCurrency(stats.pipelineValue),
            icon: TrendingUp,
            color: "text-blue-500",
          },
          {
            label: "Ganhas este mês",
            value: formatCurrency(stats.wonThisMonth),
            icon: Trophy,
            color: "text-green-500",
          },
          {
            label: "Total de deals",
            value: stats.totalDeals,
            icon: DollarSign,
            color: "text-purple-500",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3"
          >
            <div className={cn("p-2 rounded-lg bg-muted", color)}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={cn("font-bold", typeof value === "number" ? "text-xl" : "text-base")}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={OPPORTUNITIES_COLUMNS}
        data={{ data: deals, isLoading }}
        showPagination={deals.length > 10}
        emptyMessage="Nenhuma oportunidade encontrada."
        renderToolbar={() => (
          <>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, contato ou empresa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={stage} onValueChange={(v) => setStage(v as DealStage | "all")}>
              <SelectTrigger className="h-9 w-36">
                <SelectValue placeholder="Estágio" />
              </SelectTrigger>
              <SelectContent>
                {stageOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      />
    </div>
  );
}
