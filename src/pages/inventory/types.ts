export interface Product {
  id: string;
  name: string;
  sku?: string;
  categoryName?: string;
  price?: number;
  currency?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  parentName?: string;
  productCount?: number;
  createdAt: string;
}

export interface StockLevel {
  id: string;
  productName: string;
  warehouseName?: string;
  quantity: number;
  updatedAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code?: string;
  address?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  createdAt: string;
}
