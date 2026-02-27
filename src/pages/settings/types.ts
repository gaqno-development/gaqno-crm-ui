export interface Organization {
  id: string;
  name: string;
  slug?: string;
  updatedAt: string;
}

export interface CustomField {
  id: string;
  name: string;
  entityType: string;
  fieldType: string;
  updatedAt: string;
}

export interface Pipeline {
  id: string;
  name: string;
  stages?: string[];
  updatedAt: string;
}

export interface NotificationSetting {
  id: string;
  channel: string;
  enabled: boolean;
  updatedAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix?: string;
  lastUsedAt?: string;
  createdAt: string;
}
