import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatCurrency, formatDate } from "@gaqno-development/frontcore/utils";
import type { FulfillmentOrder, Shipment, ReturnItem, InvoiceOperation } from "@gaqno-development/types/crm";

export const FULFILLMENT_COLUMNS: ColumnDef<FulfillmentOrder>[] = [
  { accessorKey: "orderNumber", header: "Pedido", cell: ({ row }) => <span className="font-medium text-sm">{row.original.orderNumber}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const SHIPPING_COLUMNS: ColumnDef<Shipment>[] = [
  { accessorKey: "trackingCode", header: "Rastreio", cell: ({ row }) => <span className="font-medium text-sm">{row.original.trackingCode ?? "—"}</span> },
  { accessorKey: "orderNumber", header: "Pedido", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.orderNumber ?? "—"}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const RETURNS_COLUMNS: ColumnDef<ReturnItem>[] = [
  { accessorKey: "orderNumber", header: "Pedido", cell: ({ row }) => <span className="font-medium text-sm">{row.original.orderNumber ?? "—"}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const INVOICING_OPS_COLUMNS: ColumnDef<InvoiceOperation>[] = [
  { accessorKey: "invoiceNumber", header: "Nº Fatura", cell: ({ row }) => <span className="font-medium text-sm">{row.original.invoiceNumber ?? "—"}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) =>
      row.original.amount != null ? formatCurrency(row.original.amount) : "—",
  },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];
