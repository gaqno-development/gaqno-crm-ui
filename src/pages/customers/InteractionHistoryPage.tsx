import { Input } from "@gaqno-development/frontcore/components/ui";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { useCRMFilteredInteractions } from "../../hooks/useCRMFilteredInteractions";
import { INTERACTION_TYPE_CONFIG } from "./history/InteractionConstants";
import { formatDateTime } from "@gaqno-development/frontcore/utils";

export default function InteractionHistoryPage() {
  const { interactions, isLoading, search, setSearch } = useCRMFilteredInteractions();

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar por contato ou resumo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Timeline */}
      {!isLoading && (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-5 pl-11">
            {interactions.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">Nenhuma interação encontrada.</p>
            )}
            {interactions.map((interaction) => {
              const config = INTERACTION_TYPE_CONFIG[interaction.type];
              const Icon = config.icon;
              return (
                <div key={interaction.id} className="relative">
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute -left-[30px] top-2 h-3 w-3 rounded-full border-2 border-background",
                      config.dotColor
                    )}
                  />
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    {/* Header */}
                    <div className={cn("flex items-center gap-2 px-4 py-2", config.bgColor)}>
                      <Icon className={cn("h-4 w-4", config.textColor)} />
                      <span className={cn("text-xs font-semibold", config.textColor)}>
                        {config.label}
                      </span>
                      {interaction.direction && (
                        interaction.direction === "inbound" ? (
                          <ArrowDownLeft className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                        )
                      )}
                      <span className="ml-auto text-[11px] text-muted-foreground">
                        {formatDateTime(interaction.createdAt)}
                      </span>
                    </div>
                    {/* Body */}
                    <div className="px-4 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{interaction.contactName || "Contato Desconhecido"}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{interaction.summary}</p>
                      {interaction.body && (
                        <p className="text-xs text-foreground/70 mt-2 bg-muted/50 rounded-lg p-2 italic whitespace-pre-wrap">
                          {interaction.body}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
