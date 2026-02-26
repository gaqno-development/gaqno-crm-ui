import { cn } from "@gaqno-development/frontcore/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatDateTime } from "@gaqno-development/frontcore/utils";
import { INTERACTION_TYPE_CONFIG } from "./InteractionConstants";
import type { Interaction, InteractionType } from "@gaqno-development/types/crm";

export interface InteractionHistoryItemProps {
  interaction: Interaction;
}

export function InteractionHistoryItem({ interaction }: InteractionHistoryItemProps) {
  const config = INTERACTION_TYPE_CONFIG[interaction.type as InteractionType];
  const Icon = config.icon;

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute -left-[30px] top-2 h-3 w-3 rounded-full border-2 border-background",
          config.dotColor
        )}
      />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className={cn("flex items-center gap-2 px-4 py-2", config.bgColor)}>
          <Icon className={cn("h-4 w-4", config.textColor)} />
          <span className={cn("text-xs font-semibold", config.textColor)}>
            {config.label}
          </span>
          {interaction.direction &&
            (interaction.direction === "inbound" ? (
              <ArrowDownLeft className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
            ))}
          <span className="ml-auto text-[11px] text-muted-foreground">
            {formatDateTime(interaction.createdAt)}
          </span>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium">
              {interaction.contactName || "Contato Desconhecido"}
            </p>
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
}
