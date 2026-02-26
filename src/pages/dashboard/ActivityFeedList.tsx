import { cn } from "@gaqno-development/frontcore/lib/utils";
import { formatDateTime } from "@gaqno-development/frontcore/utils";
import { INTERACTION_TYPE_CONFIG } from "../customers/history/InteractionConstants";
import type { InteractionType } from "@gaqno-development/types/crm";

export interface ActivityFeedItem {
  id: string;
  type: string;
  contactName?: string | null;
  summary?: string | null;
  body?: string | null;
  createdAt: string;
}

export interface ActivityFeedListProps {
  interactions: ActivityFeedItem[];
}

const defaultConfig = INTERACTION_TYPE_CONFIG.whatsapp;

export function ActivityFeedList({ interactions }: ActivityFeedListProps) {
  return (
    <div className="space-y-2">
      {interactions.map((interaction) => {
        const config =
          INTERACTION_TYPE_CONFIG[interaction.type as InteractionType] ?? defaultConfig;
        const Icon = config.icon;
        return (
          <div
            key={interaction.id}
            className={cn(
              "flex gap-3 items-start rounded-lg border border-border bg-card px-4 py-3",
              "hover:bg-muted/30 transition-colors"
            )}
          >
            <div
              className={cn(
                "p-2 rounded-full shrink-0 mt-0.5",
                config.bgColor,
                config.textColor
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight">
                {interaction.contactName || "Contato"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {interaction.summary || interaction.body || "—"}
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
              {formatDateTime(interaction.createdAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
