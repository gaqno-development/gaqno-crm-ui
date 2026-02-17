import type { ChildConfig } from "@gaqno-development/frontcore/components";
import {
  HomeIcon,
  FilledBellIcon,
  FileDescriptionIcon,
  GearIcon,
  TargetIcon,
  UsersIcon,
} from "@gaqno-development/frontcore/components/icons";
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  UserCircle,
  Building,
  Package,
  Warehouse,
  ClipboardList,
  DollarSign,
  Truck,
  RotateCcw,
  FileText,
  BarChart3,
  Link2,
  ShieldCheck,
  List,
  Clock,
  Sparkles,
  Target,
  Film,
  Send,
} from "lucide-react";

const CRM_BREADCRUMB = { label: "CRM", href: "/crm/dashboard" } as const;

export const SECTION_CONFIG = {
  breadcrumbRoot: CRM_BREADCRUMB,
} as const;

export const DASHBOARD_BASE = "/crm/dashboard";
export const DASHBOARD_DEFAULT = "overview";
export const DASHBOARD_CHILDREN: ChildConfig[] = [
  {
    segment: "overview",
    label: "Overview",
    href: "/crm/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    segment: "kpis",
    label: "KPIs",
    href: "/crm/dashboard/kpis",
    icon: TrendingUp,
  },
  {
    segment: "activity-feed",
    label: "Activity Feed",
    href: "/crm/dashboard/activity-feed",
    icon: HomeIcon,
  },
  {
    segment: "alerts",
    label: "Alerts & Notifications",
    href: "/crm/dashboard/alerts",
    icon: FilledBellIcon,
  },
];

export const SALES_BASE = "/crm/sales";
export const SALES_DEFAULT = "leads";
export const SALES_CHILDREN: ChildConfig[] = [
  {
    segment: "leads",
    label: "Leads",
    href: "/crm/sales/leads",
    icon: UsersIcon,
  },
  {
    segment: "opportunities",
    label: "Opportunities (Pipeline)",
    href: "/crm/sales/opportunities",
    icon: TrendingUp,
  },
  {
    segment: "deals",
    label: "Deals",
    href: "/crm/sales/deals",
    icon: Briefcase,
  },
  {
    segment: "quotes",
    label: "Quotes",
    href: "/crm/sales/quotes",
    icon: FileDescriptionIcon,
  },
  {
    segment: "contracts",
    label: "Contracts",
    href: "/crm/sales/contracts",
    icon: FileText,
  },
  {
    segment: "orders",
    label: "Orders",
    href: "/crm/sales/orders",
    icon: ClipboardList,
  },
];

export const CUSTOMERS_BASE = "/crm/customers";
export const CUSTOMERS_DEFAULT = "accounts";
export const CUSTOMERS_CHILDREN: ChildConfig[] = [
  {
    segment: "accounts",
    label: "Accounts (Companies)",
    href: "/crm/customers/accounts",
    icon: Building,
  },
  {
    segment: "contacts",
    label: "Contacts",
    href: "/crm/customers/contacts",
    icon: UserCircle,
  },
  {
    segment: "profiles",
    label: "Customer Profiles",
    href: "/crm/customers/profiles",
    icon: UsersIcon,
  },
  {
    segment: "ai-content",
    label: "AI Content",
    href: "/crm/customers/ai-content",
    icon: Sparkles,
  },
  {
    segment: "interaction-history",
    label: "Interaction History",
    href: "/crm/customers/interaction-history",
    icon: Clock,
  },
  {
    segment: "support-tickets",
    label: "Support Tickets",
    href: "/crm/customers/support-tickets",
    icon: List,
  },
];

export const INVENTORY_BASE = "/crm/inventory";
export const INVENTORY_DEFAULT = "products";
export const INVENTORY_CHILDREN: ChildConfig[] = [
  {
    segment: "products",
    label: "Products",
    href: "/crm/inventory/products",
    icon: Package,
  },
  {
    segment: "categories",
    label: "Categories",
    href: "/crm/inventory/categories",
    icon: List,
  },
  {
    segment: "stock-levels",
    label: "Stock Levels",
    href: "/crm/inventory/stock-levels",
    icon: BarChart3,
  },
  {
    segment: "warehouses",
    label: "Warehouses",
    href: "/crm/inventory/warehouses",
    icon: Warehouse,
  },
  {
    segment: "suppliers",
    label: "Suppliers",
    href: "/crm/inventory/suppliers",
    icon: Building,
  },
];

export const OPERATIONS_BASE = "/crm/operations";
export const OPERATIONS_DEFAULT = "order-fulfillment";
export const OPERATIONS_CHILDREN: ChildConfig[] = [
  {
    segment: "order-fulfillment",
    label: "Order Fulfillment",
    href: "/crm/operations/order-fulfillment",
    icon: ClipboardList,
  },
  {
    segment: "shipping",
    label: "Shipping & Logistics",
    href: "/crm/operations/shipping",
    icon: Truck,
  },
  {
    segment: "returns",
    label: "Returns",
    href: "/crm/operations/returns",
    icon: RotateCcw,
  },
  {
    segment: "invoicing",
    label: "Invoicing",
    href: "/crm/operations/invoicing",
    icon: FileText,
  },
];

export const FINANCE_BASE = "/crm/finance";
export const FINANCE_DEFAULT = "invoices";
export const FINANCE_CHILDREN: ChildConfig[] = [
  {
    segment: "invoices",
    label: "Invoices",
    href: "/crm/finance/invoices",
    icon: FileText,
  },
  {
    segment: "payments",
    label: "Payments",
    href: "/crm/finance/payments",
    icon: DollarSign,
  },
  {
    segment: "pricing-rules",
    label: "Pricing Rules",
    href: "/crm/finance/pricing-rules",
    icon: List,
  },
  {
    segment: "taxes",
    label: "Taxes",
    href: "/crm/finance/taxes",
    icon: DollarSign,
  },
];

export const REPORTS_BASE = "/crm/reports";
export const REPORTS_DEFAULT = "analytics";
export const REPORTS_CHILDREN: ChildConfig[] = [
  {
    segment: "analytics",
    label: "Reports & Analytics",
    href: "/crm/reports/analytics",
    icon: BarChart3,
  },
  {
    segment: "sales-reports",
    label: "Sales Reports",
    href: "/crm/reports/sales-reports",
    icon: TrendingUp,
  },
  {
    segment: "customer-insights",
    label: "Customer Insights",
    href: "/crm/reports/customer-insights",
    icon: UsersIcon,
  },
  {
    segment: "inventory-reports",
    label: "Inventory Reports",
    href: "/crm/reports/inventory-reports",
    icon: Package,
  },
  {
    segment: "financial-reports",
    label: "Financial Reports",
    href: "/crm/reports/financial-reports",
    icon: DollarSign,
  },
  {
    segment: "custom-reports",
    label: "Custom Reports",
    href: "/crm/reports/custom-reports",
    icon: FileDescriptionIcon,
  },
];

export const AUTOMATION_BASE = "/crm/automation";
export const AUTOMATION_DEFAULT = "workflows";
export const AUTOMATION_CHILDREN: ChildConfig[] = [
  {
    segment: "workflows",
    label: "Workflows",
    href: "/crm/automation/workflows",
    icon: TargetIcon,
  },
  {
    segment: "ai-campaigns",
    label: "AI Campaigns",
    href: "/crm/automation/ai-campaigns",
    icon: Target,
  },
  {
    segment: "triggers",
    label: "Triggers & Rules",
    href: "/crm/automation/triggers",
    icon: ShieldCheck,
  },
  {
    segment: "webhooks",
    label: "Webhooks",
    href: "/crm/automation/webhooks",
    icon: Link2,
  },
  {
    segment: "integrations",
    label: "Integrations",
    href: "/crm/automation/integrations",
    icon: Link2,
  },
];

export const ADMINISTRATION_BASE = "/crm/administration";
export const ADMINISTRATION_DEFAULT = "users";
export const ADMINISTRATION_CHILDREN: ChildConfig[] = [
  {
    segment: "users",
    label: "Users & Roles",
    href: "/crm/administration/users",
    icon: UsersIcon,
  },
  {
    segment: "permissions",
    label: "Permissions",
    href: "/crm/administration/permissions",
    icon: ShieldCheck,
  },
  {
    segment: "teams",
    label: "Teams",
    href: "/crm/administration/teams",
    icon: UsersIcon,
  },
  {
    segment: "audit-logs",
    label: "Audit Logs",
    href: "/crm/administration/audit-logs",
    icon: FileText,
  },
  {
    segment: "system-settings",
    label: "System Settings",
    href: "/crm/administration/system-settings",
    icon: GearIcon,
  },
];

export const AI_MARKETING_BASE = "/crm/ai-marketing";
export const AI_MARKETING_DEFAULT = "video";
export const AI_MARKETING_CHILDREN: ChildConfig[] = [
  {
    segment: "video",
    label: "Video",
    href: "/crm/ai-marketing/video",
    icon: Film,
  },
  {
    segment: "distribution",
    label: "Distribution",
    href: "/crm/ai-marketing/distribution",
    icon: Send,
  },
];

export const SETTINGS_BASE = "/crm/settings";
export const SETTINGS_DEFAULT = "organization";
export const SETTINGS_CHILDREN: ChildConfig[] = [
  {
    segment: "organization",
    label: "Organization Profile",
    href: "/crm/settings/organization",
    icon: Building,
  },
  {
    segment: "custom-fields",
    label: "Custom Fields",
    href: "/crm/settings/custom-fields",
    icon: List,
  },
  {
    segment: "pipelines",
    label: "Pipelines",
    href: "/crm/settings/pipelines",
    icon: TrendingUp,
  },
  {
    segment: "notifications",
    label: "Notifications",
    href: "/crm/settings/notifications",
    icon: FilledBellIcon,
  },
  {
    segment: "api-keys",
    label: "API Keys",
    href: "/crm/settings/api-keys",
    icon: Link2,
  },
];
