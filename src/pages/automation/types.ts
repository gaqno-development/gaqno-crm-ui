export interface Workflow {
  id: string;
  name: string;
  status?: string;
  triggerType?: string;
  updatedAt: string;
}

export interface AICampaign {
  id: string;
  name: string;
  status?: string;
  createdAt: string;
}

export interface Trigger {
  id: string;
  name: string;
  event?: string;
  enabled: boolean;
  updatedAt: string;
}

export interface Webhook {
  id: string;
  url: string;
  events?: string[];
  enabled: boolean;
  createdAt: string;
}

export interface Integration {
  id: string;
  name: string;
  type?: string;
  enabled: boolean;
  updatedAt: string;
}
