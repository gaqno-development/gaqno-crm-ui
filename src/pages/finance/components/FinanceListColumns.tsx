import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatCurrency, formatDate } from "@gaqno-development/frontcore/utils";
import type { Invoice, Payment, PricingRule, Tax } from "../types";

export const INVOICES_COLUMNS: ColumnDef<Invoice>[] = [
  { accessorKey: "invoiceNumber", header: "Nº Fatura", cell: ({ row }) => <span className="font-medium text-sm">{row.original.invoiceNumber}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) =>
      row.original.amount != null
        ? formatCurrency(row.original.amount, { currency: row.original.currency ?? "BRL" })
        : "—",
  },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  {
    accessorKey: "dueDate",
    header: "Vencimento",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.dueDate ? formatDate(row.original.dueDate, { day: "2-digit", month: "short" }) : "—"}</span>,
  },
];

export const PAYMENTS_COLUMNS: ColumnDef<Payment>[] = [
  { accessorKey: "invoiceNumber", header: "Fatura", cell: ({ row }) => <span className="font-medium text-sm">{row.original.invoiceNumber ?? "—"}</span> },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) =>
      row.original.amount != null
        ? formatCurrency(row.original.amount, { currency: row.original.currency ?? "BRL" })
        : "—",
  },
  { accessorKey: "method", header: "Método", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.method ?? "—"}</span> },
  { accessorKey: "paidAt", header: "Pago em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.paidAt, { day: "2-digit", month: "short" })}</span> },
];

export const PRICING_RULES_COLUMNS: ColumnDef<PricingRule>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "type", header: "Tipo", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.type ?? "—"}</span> },
  { accessorKey: "value", header: "Valor", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.value ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const TAXES_COLUMNS: ColumnDef<Tax>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "rate", header: "Alíquota (%)", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.rate != null ? `${row.original.rate}%` : "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];
