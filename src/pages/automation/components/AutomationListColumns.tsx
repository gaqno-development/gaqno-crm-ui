import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatDate } from "@gaqno-development/frontcore/utils";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import type { Workflow, AICampaign, Trigger, Webhook, Integration } from "../types";

export const WORKFLOWS_COLUMNS: ColumnDef<Workflow>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  { accessorKey: "triggerType", header: "Gatilho", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.triggerType ?? "—"}</span> },
  { accessorKey: "updatedAt", header: "Atualizado", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, { day: "2-digit", month: "short" })}</span> },
];

export const AI_CAMPAIGNS_COLUMNS: ColumnDef<AICampaign>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const TRIGGERS_COLUMNS: ColumnDef<Trigger>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "event", header: "Evento", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.event ?? "—"}</span> },
  {
    accessorKey: "enabled",
    header: "Ativo",
    cell: ({ row }) => (
      <span className={cn("text-xs", row.original.enabled ? "text-green-600" : "text-muted-foreground")}>
        {row.original.enabled ? "Sim" : "Não"}
      </span>
    ),
  },
  { accessorKey: "updatedAt", header: "Atualizado", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, { day: "2-digit", month: "short" })}</span> },
];

export const WEBHOOKS_COLUMNS: ColumnDef<Webhook>[] = [
  { accessorKey: "url", header: "URL", cell: ({ row }) => <span className="font-medium text-sm truncate max-w-[200px] block">{row.original.url}</span> },
  { accessorKey: "events", header: "Eventos", cell: ({ row }) => <span className="text-xs text-muted-foreground">{(row.original.events ?? []).length} evento(s)</span> },
  {
    accessorKey: "enabled",
    header: "Ativo",
    cell: ({ row }) => (
      <span className={cn("text-xs", row.original.enabled ? "text-green-600" : "text-muted-foreground")}>
        {row.original.enabled ? "Sim" : "Não"}
      </span>
    ),
  },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const INTEGRATIONS_COLUMNS: ColumnDef<Integration>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "type", header: "Tipo", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.type ?? "—"}</span> },
  {
    accessorKey: "enabled",
    header: "Ativo",
    cell: ({ row }) => (
      <span className={cn("text-xs", row.original.enabled ? "text-green-600" : "text-muted-foreground")}>
        {row.original.enabled ? "Sim" : "Não"}
      </span>
    ),
  },
  { accessorKey: "updatedAt", header: "Atualizado", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, { day: "2-digit", month: "short" })}</span> },
];
