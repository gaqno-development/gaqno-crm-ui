import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatCurrency, formatDate } from "@gaqno-development/frontcore/utils";
import type { Quote, Contract, Order } from "../types";

export const QUOTES_COLUMNS: ColumnDef<Quote>[] = [
  { accessorKey: "title", header: "Título", cell: ({ row }) => <span className="font-medium text-sm">{row.original.title}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) =>
      row.original.value != null
        ? formatCurrency(row.original.value, { currency: row.original.currency ?? "BRL" })
        : "—",
  },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];

export const CONTRACTS_COLUMNS: ColumnDef<Contract>[] = [
  { accessorKey: "title", header: "Título", cell: ({ row }) => <span className="font-medium text-sm">{row.original.title}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  {
    accessorKey: "startDate",
    header: "Início",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.startDate ? formatDate(row.original.startDate, { day: "2-digit", month: "short" }) : "—"}</span>,
  },
  {
    accessorKey: "endDate",
    header: "Fim",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.endDate ? formatDate(row.original.endDate, { day: "2-digit", month: "short" }) : "—"}</span>,
  },
];

export const ORDERS_COLUMNS: ColumnDef<Order>[] = [
  { accessorKey: "orderNumber", header: "Nº Pedido", cell: ({ row }) => <span className="font-medium text-sm">{row.original.orderNumber}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) =>
      row.original.value != null
        ? formatCurrency(row.original.value, { currency: row.original.currency ?? "BRL" })
        : "—",
  },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];
