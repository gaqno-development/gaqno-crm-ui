export interface Quote {
  id: string;
  title: string;
  contactName?: string;
  value?: number;
  currency?: string;
  status?: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  title: string;
  contactName?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  contactName?: string;
  value?: number;
  currency?: string;
  status?: string;
  createdAt: string;
}
