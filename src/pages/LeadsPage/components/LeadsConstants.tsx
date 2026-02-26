import { ScoreBar } from "@gaqno-development/frontcore/components/ui";
import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatDate } from "@gaqno-development/frontcore/utils";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import type { Lead, LeadStatus } from "../../../types/crm";

export const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: "Novo",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  contacted: {
    label: "Contatado",
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  qualified: {
    label: "Qualificado",
    className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },
  lost: {
    label: "Perdido",
    className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
};

export const LEADS_COLUMNS: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Lead",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-sm">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.company}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const cfg = STATUS_CONFIG[row.original.status];
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            cfg.className
          )}
        >
          {cfg.label}
        </span>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => <ScoreBar score={row.original.score} />,
  },
  {
    accessorKey: "source",
    header: "Fonte",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.source}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}
      </span>
    ),
  },
];
