import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatDate } from "@gaqno-development/frontcore/utils";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import type { CustomField, Pipeline, NotificationSetting, ApiKey } from "../types";

export const CUSTOM_FIELDS_COLUMNS: ColumnDef<CustomField>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "entityType", header: "Entidade", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.entityType}</span> },
  { accessorKey: "fieldType", header: "Tipo", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.fieldType}</span> },
  { accessorKey: "updatedAt", header: "Atualizado", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, { day: "2-digit", month: "short" })}</span> },
];

export const PIPELINES_COLUMNS: ColumnDef<Pipeline>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "stages", header: "Estágios", cell: ({ row }) => <span className="text-xs text-muted-foreground">{(row.original.stages ?? []).length} estágio(s)</span> },
  { accessorKey: "updatedAt", header: "Atualizado", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, { day: "2-digit", month: "short" })}</span> },
];

export const NOTIFICATION_SETTINGS_COLUMNS: ColumnDef<NotificationSetting>[] = [
  { accessorKey: "channel", header: "Canal", cell: ({ row }) => <span className="font-medium text-sm">{row.original.channel}</span> },
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

export const API_KEYS_COLUMNS: ColumnDef<ApiKey>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "prefix", header: "Prefixo", cell: ({ row }) => <span className="text-xs text-muted-foreground font-mono">{row.original.prefix ?? "—"}</span> },
  { accessorKey: "lastUsedAt", header: "Último uso", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.lastUsedAt ? formatDate(row.original.lastUsedAt, { day: "2-digit", month: "short" }) : "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];
