import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatDate } from "@gaqno-development/frontcore/utils";
import type { CRMUser, Permission, Team, AuditLogEntry, SystemSetting } from "../types";

export const USERS_COLUMNS: ColumnDef<CRMUser>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "email", header: "E-mail", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.email}</span> },
  { accessorKey: "role", header: "Função", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.role ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const PERMISSIONS_COLUMNS: ColumnDef<Permission>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "resource", header: "Recurso", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.resource ?? "—"}</span> },
  { accessorKey: "description", header: "Descrição", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.description ?? "—"}</span> },
];

export const TEAMS_COLUMNS: ColumnDef<Team>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "memberCount", header: "Membros", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.memberCount ?? 0}</span> },
  { accessorKey: "createdAt", header: "Criado em", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span> },
];

export const AUDIT_LOGS_COLUMNS: ColumnDef<AuditLogEntry>[] = [
  { accessorKey: "action", header: "Ação", cell: ({ row }) => <span className="font-medium text-sm">{row.original.action}</span> },
  { accessorKey: "userName", header: "Usuário", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.userName ?? "—"}</span> },
  { accessorKey: "entityType", header: "Entidade", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.entityType ?? "—"}</span> },
  { accessorKey: "createdAt", header: "Data", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span> },
];

export const SYSTEM_SETTINGS_COLUMNS: ColumnDef<SystemSetting>[] = [
  { accessorKey: "key", header: "Chave", cell: ({ row }) => <span className="font-medium text-sm">{row.original.key}</span> },
  { accessorKey: "value", header: "Valor", cell: ({ row }) => <span className="text-sm text-muted-foreground truncate max-w-[200px] block">{row.original.value ?? "—"}</span> },
  { accessorKey: "updatedAt", header: "Atualizado", cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, { day: "2-digit", month: "short" })}</span> },
];
