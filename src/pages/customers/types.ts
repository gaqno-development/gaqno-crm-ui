export interface CustomerProfile {
  id: string;
  name: string;
  email?: string;
  company?: string;
  segment?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  contactName?: string;
  status?: string;
  priority?: string;
  createdAt: string;
}
