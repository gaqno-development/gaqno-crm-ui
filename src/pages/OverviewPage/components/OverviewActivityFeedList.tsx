import { cn } from "@gaqno-development/frontcore/lib/utils";
import { EmptyState } from "@gaqno-development/frontcore/components/ui";
import { formatRelativeTime } from "@gaqno-development/frontcore/utils";
import type { LucideIcon } from "lucide-react";
import {
  Users,
  MessageCircle,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

export interface OverviewActivityItem {
  id: string;
  type: string;
  contactName?: string | null;
  summary: string;
  createdAt: string;
}

const ACTIVITY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  email: Mail,
  phone: Phone,
  note: FileText,
  meeting: Users,
  lead_created: UserPlus,
  deal_moved: ArrowRight,
  contact_added: Users,
  message_received: MessageCircle,
  deal_won: CheckCircle2,
  deal_lost: XCircle,
};

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

export interface OverviewActivityFeedListProps {
  interactions: OverviewActivityItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
}

export function OverviewActivityFeedList({
  interactions,
  isLoading = false,
  emptyTitle = "Nenhuma atividade recente",
  emptyDescription,
  emptyIcon: EmptyIcon = MessageCircle,
}: OverviewActivityFeedListProps) {
  return (
    <div className="space-y-3">
      {interactions.map((interaction) => {
        const Icon = ACTIVITY_ICON[interaction.type] || ArrowRight;
        const color = ACTIVITY_COLOR[interaction.type] || "text-muted-foreground";
        return (
          <div key={interaction.id} className="flex gap-3 items-start">
            <div className={cn("p-1.5 rounded-full bg-muted mt-0.5", color)}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium leading-tight line-clamp-1">
                {interaction.contactName || "Sistema"}
              </p>
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
      {interactions.length === 0 && !isLoading && (
        <EmptyState
          icon={EmptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          size="sm"
        />
      )}
    </div>
  );
}
