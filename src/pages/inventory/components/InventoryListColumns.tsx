import type { ColumnDef } from "@gaqno-development/frontcore/components/ui";
import { formatCurrency, formatDate } from "@gaqno-development/frontcore/utils";
import type { Product, Category, StockLevel, Warehouse, Supplier } from "../types";

export const PRODUCTS_COLUMNS: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Produto", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "sku", header: "SKU", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.sku ?? "—"}</span> },
  { accessorKey: "categoryName", header: "Categoria", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.categoryName ?? "—"}</span> },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) =>
      row.original.price != null
        ? formatCurrency(row.original.price, { currency: row.original.currency ?? "BRL" })
        : "—",
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];

export const CATEGORIES_COLUMNS: ColumnDef<Category>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "parentName", header: "Pai", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.parentName ?? "—"}</span> },
  { accessorKey: "productCount", header: "Produtos", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.productCount ?? 0}</span> },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];

export const STOCK_LEVELS_COLUMNS: ColumnDef<StockLevel>[] = [
  { accessorKey: "productName", header: "Produto", cell: ({ row }) => <span className="font-medium text-sm">{row.original.productName}</span> },
  { accessorKey: "warehouseName", header: "Armazém", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.warehouseName ?? "—"}</span> },
  { accessorKey: "quantity", header: "Quantidade", cell: ({ row }) => <span className="font-medium text-sm">{row.original.quantity}</span> },
  {
    accessorKey: "updatedAt",
    header: "Atualizado",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, { day: "2-digit", month: "short" })}</span>,
  },
];

export const WAREHOUSES_COLUMNS: ColumnDef<Warehouse>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "code", header: "Código", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.code ?? "—"}</span> },
  { accessorKey: "address", header: "Endereço", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.address ?? "—"}</span> },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];

export const SUPPLIERS_COLUMNS: ColumnDef<Supplier>[] = [
  { accessorKey: "name", header: "Nome", cell: ({ row }) => <span className="font-medium text-sm">{row.original.name}</span> },
  { accessorKey: "email", header: "E-mail", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.email ?? "—"}</span> },
  { accessorKey: "phone", header: "Telefone", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.phone ?? "—"}</span> },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt, { day: "2-digit", month: "short" })}</span>,
  },
];
