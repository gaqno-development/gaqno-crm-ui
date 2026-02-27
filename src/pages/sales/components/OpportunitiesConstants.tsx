import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatCurrency, formatDate } from "@gaqno-development/frontcore/utils";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import type { Deal, DealStage } from "../../../types/crm";

export const STAGE_LABELS: Record<DealStage, string> = {
  prospecting: "Prospecção",
  qualification: "Qualificação",
  proposal: "Proposta",
  negotiation: "Negociação",
  won: "Ganho",
  lost: "Perdido",
};

export const OPPORTUNITIES_COLUMNS: ColumnDef<Deal>[] = [
  {
    accessorKey: "name",
    header: "Oportunidade",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-sm">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.company}</p>
      </div>
    ),
  },
  {
    accessorKey: "contactName",
    header: "Contato",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span>
    ),
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => (
      <span className="font-medium text-sm">
        {formatCurrency(row.original.value, { currency: row.original.currency ?? "BRL" })}
      </span>
    ),
  },
  {
    accessorKey: "stage",
    header: "Estágio",
    cell: ({ row }) => {
      const s = row.original.stage;
      const stageClass =
        s === "won"
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
          : s === "lost"
            ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
            : "bg-muted text-muted-foreground";
      return (
        <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", stageClass)}>
          {STAGE_LABELS[s]}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {formatDate(row.original.updatedAt ?? row.original.createdAt, {
          day: "2-digit",
          month: "short",
        })}
      </span>
    ),
  },
];
