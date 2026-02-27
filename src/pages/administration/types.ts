export interface CRMUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource?: string;
}

export interface Team {
  id: string;
  name: string;
  memberCount?: number;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  userId?: string;
  userName?: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value?: string;
  updatedAt: string;
}
