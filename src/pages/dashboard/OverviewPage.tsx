import { cn } from "@gaqno-development/frontcore/lib/utils";
import { Button } from "@gaqno-development/frontcore/components/ui";
import {
  Users,
  Briefcase,
  TrendingUp,
  Trophy,
  MessageCircle,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useCRMLeads } from "../../hooks/useCRMLeads";
import { useCRMDeals } from "../../hooks/useCRMDeals";
import { useCRMInteractions } from "../../hooks/useCRMContacts";
import type { DealStage, Interaction } from "../../types/crm";

function formatCurrency(val: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(val);
}

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h atrás`;
  return `${Math.floor(hours / 24)}d atrás`;
}

const ACTIVITY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  email: Mail, // Need to import Mail
  phone: Phone, // Need to import Phone
  note: FileText, // Need to import FileText
  meeting: Users,
  lead_created: UserPlus,
  deal_moved: ArrowRight,
  contact_added: Users,
  message_received: MessageCircle,
  deal_won: CheckCircle2,
  deal_lost: XCircle,
};

// I'll add the missing icons
import { Mail, Phone, FileText } from "lucide-react";

const ACTIVITY_COLOR: Record<string, string> = {
  whatsapp: "text-green-500",
  email: "text-blue-500",
  phone: "text-purple-500",
  note: "text-orange-500",
  meeting: "text-teal-500",
  lead_created: "text-blue-500",
  deal_moved: "text-purple-500",
  contact_added: "text-teal-500",
  message_received: "text-green-500",
  deal_won: "text-green-600",
  deal_lost: "text-red-500",
};

const FUNNEL_STAGES: { stage: DealStage; label: string; color: string }[] = [
  { stage: "prospecting", label: "Prospecção", color: "bg-slate-400 dark:bg-slate-500" },
  { stage: "qualification", label: "Qualificação", color: "bg-blue-500" },
  { stage: "proposal", label: "Proposta", color: "bg-purple-500" },
  { stage: "negotiation", label: "Negociação", color: "bg-yellow-500" },
  { stage: "won", label: "Ganhos", color: "bg-green-500" },
];

export default function OverviewPage() {
  const { stats: leadStats, isLoading: isLoadingLeads } = useCRMLeads();
  const { dealsByStage, stats: dealStats, isLoading: isLoadingDeals } = useCRMDeals();
  const { interactions, isLoading: isLoadingInteractions } = useCRMInteractions();

  const isLoading = isLoadingLeads || isLoadingDeals;

  const maxDealsInStage = Math.max(
    ...FUNNEL_STAGES.map((s) => dealsByStage[s.stage]?.length || 0),
    1
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total de Leads",
            value: leadStats.total,
            sub: `${leadStats.qualified} qualificados`,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            label: "Oportunidades Ativas",
            value: dealStats.activeDeals,
            sub: "pipeline ativo",
            icon: Briefcase,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/20",
          },
          {
            label: "Valor em Pipeline",
            value: formatCurrency(dealStats.pipelineValue),
            sub: "receita estimada",
            icon: TrendingUp,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Vendas (Mês)",
            value: formatCurrency(dealStats.wonThisMonth),
            sub: "receita fechada",
            icon: Trophy,
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-900/20",
          },
        ].map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card px-5 py-4 flex flex-col gap-3 relative overflow-hidden"
          >
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            )}
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bg)}>
              <Icon className={cn("h-5 w-5", color)} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold mt-0.5">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Deal Funnel */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
          {isLoadingDeals && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          <h2 className="text-sm font-semibold mb-4">Funil de Vendas</h2>
          <div className="space-y-2.5">
            {FUNNEL_STAGES.map(({ stage, label, color }) => {
              const count = dealsByStage[stage]?.length || 0;
              const value = (dealsByStage[stage] || []).reduce((sum, d) => sum + Number(d.value), 0);
              const widthPct = Math.max((count / maxDealsInStage) * 100, 8);
              return (
                <div key={stage} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24 text-right shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 h-7 rounded-lg bg-muted overflow-hidden relative">
                    <div
                      className={cn("h-full rounded-lg flex items-center px-2.5 transition-all", color)}
                      style={{ width: `${widthPct}%` }}
                    >
                      <span className="text-white text-xs font-medium">{count}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground w-24 shrink-0">
                    {count > 0 ? formatCurrency(value) : "—"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-5 pt-4 border-t border-border">
            <Button size="sm" variant="outline" asChild>
              <a href="/crm/sales/leads">+ Novo Lead</a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="/crm/sales/deals">+ Nova Oportunidade</a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="/omnichannel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                Painel Omnichannel
              </a>
            </Button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
          {isLoadingInteractions && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          <h2 className="text-sm font-semibold mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            {interactions.slice(0, 8).map((interaction: Interaction) => {
              const Icon = ACTIVITY_ICON[interaction.type] || ArrowRight;
              const color = ACTIVITY_COLOR[interaction.type] || "text-muted-foreground";
              return (
                <div key={interaction.id} className="flex gap-3 items-start">
                  <div className={cn("p-1.5 rounded-full bg-muted mt-0.5", color)}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-tight line-clamp-1">{interaction.contactName || "Sistema"}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                      {interaction.summary}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {formatRelativeTime(interaction.createdAt)}
                  </span>
                </div>
              );
            })}
            {interactions.length === 0 && !isLoadingInteractions && (
              <p className="text-xs text-muted-foreground italic text-center py-8">Nenhuma atividade recente.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
