import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatDate } from "@gaqno-development/frontcore/utils";
import type { CustomerProfile, SupportTicket } from "../types";

export const PROFILES_COLUMNS: ColumnDef<CustomerProfile>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-sm">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.company ?? "—"}</p>
      </div>
    ),
  },
  { accessorKey: "email", header: "E-mail", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.email ?? "—"}</span> },
  { accessorKey: "segment", header: "Segmento", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.segment ?? "—"}</span> },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];

export const SUPPORT_TICKETS_COLUMNS: ColumnDef<SupportTicket>[] = [
  { accessorKey: "subject", header: "Assunto", cell: ({ row }) => <span className="font-medium text-sm">{row.original.subject}</span> },
  { accessorKey: "contactName", header: "Contato", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.contactName ?? "—"}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.status ?? "—"}</span> },
  { accessorKey: "priority", header: "Prioridade", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.priority ?? "—"}</span> },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];
