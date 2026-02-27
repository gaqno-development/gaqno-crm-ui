export interface Invoice {
  id: string;
  invoiceNumber: string;
  contactName?: string;
  amount?: number;
  currency?: string;
  status?: string;
  dueDate?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  invoiceNumber?: string;
  amount?: number;
  currency?: string;
  method?: string;
  paidAt: string;
  createdAt: string;
}

export interface PricingRule {
  id: string;
  name: string;
  type?: string;
  value?: string;
  createdAt: string;
}

export interface Tax {
  id: string;
  name: string;
  rate?: number;
  createdAt: string;
}
