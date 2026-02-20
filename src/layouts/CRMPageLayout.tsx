import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@gaqno-development/frontcore/components/ui";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  ClipboardList,
  DollarSign,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  GearIcon,
  TargetIcon,
  UsersIcon,
} from "@gaqno-development/frontcore/components/icons";

export interface CRMPageLayoutTab {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
}

const CRM_SECTION_TABS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/crm/dashboard/overview",
    icon: LayoutDashboard,
  },
  { id: "sales", label: "Sales", href: "/crm/sales/leads", icon: TrendingUp },
  {
    id: "customers",
    label: "Customers",
    href: "/crm/customers/accounts",
    icon: UsersIcon,
  },
  {
    id: "inventory",
    label: "Inventory",
    href: "/crm/inventory/products",
    icon: Package,
  },
  {
    id: "operations",
    label: "Operations",
    href: "/crm/operations/order-fulfillment",
    icon: ClipboardList,
  },
  {
    id: "finance",
    label: "Finance",
    href: "/crm/finance/invoices",
    icon: DollarSign,
  },
  {
    id: "reports",
    label: "Reports",
    href: "/crm/reports/analytics",
    icon: BarChart3,
  },
  {
    id: "automation",
    label: "Automation",
    href: "/crm/automation/workflows",
    icon: TargetIcon,
  },
  {
    id: "ai-marketing",
    label: "AI Marketing",
    href: "/crm/ai-marketing/video",
    icon: Sparkles,
  },
  {
    id: "administration",
    label: "Administration",
    href: "/crm/administration/users",
    icon: ShieldCheck,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/crm/settings/organization",
    icon: GearIcon,
  },
] as CRMPageLayoutTab[];

const CRM_TAB_CATEGORY_ORDER = [
  "Overview",
  "Business",
  "Insights",
  "Administration",
] as const;

const CRM_SECTION_TAB_CATEGORIES: Record<string, (typeof CRM_TAB_CATEGORY_ORDER)[number]> = {
  dashboard: "Overview",
  sales: "Business",
  customers: "Business",
  inventory: "Business",
  operations: "Business",
  finance: "Business",
  reports: "Insights",
  automation: "Insights",
  "ai-marketing": "Insights",
  administration: "Administration",
  settings: "Administration",
};

export interface CRMPageLayoutTabGroup {
  label: string;
  tabs: CRMPageLayoutTab[];
}

function getCRMSectionTabGroups(): CRMPageLayoutTabGroup[] {
  const byCategory = new Map<string, CRMPageLayoutTab[]>();
  for (const tab of CRM_SECTION_TABS) {
    const category = CRM_SECTION_TAB_CATEGORIES[tab.id] ?? "Overview";
    if (!byCategory.has(category)) byCategory.set(category, []);
    byCategory.get(category)!.push(tab);
  }
  return CRM_TAB_CATEGORY_ORDER.filter((label) => byCategory.has(label)).map(
    (label) => ({ label, tabs: byCategory.get(label)! }),
  );
}

const CRM_SECTION_TAB_GROUPS = getCRMSectionTabGroups();

function getActiveSectionFromPathname(pathname: string): string {
  if (pathname.startsWith("/crm/dashboard")) return "dashboard";
  if (pathname.startsWith("/crm/sales")) return "sales";
  if (pathname.startsWith("/crm/customers")) return "customers";
  if (pathname.startsWith("/crm/inventory")) return "inventory";
  if (pathname.startsWith("/crm/operations")) return "operations";
  if (pathname.startsWith("/crm/finance")) return "finance";
  if (pathname.startsWith("/crm/reports")) return "reports";
  if (pathname.startsWith("/crm/automation")) return "automation";
  if (pathname.startsWith("/crm/ai-marketing")) return "ai-marketing";
  if (pathname.startsWith("/crm/administration")) return "administration";
  if (pathname.startsWith("/crm/settings")) return "settings";
  return "dashboard";
}

export interface CRMPageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function CRMPageLayout({ children, title }: CRMPageLayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeSection = getActiveSectionFromPathname(pathname);

  const handleTabChange = (value: string) => {
    const tab = CRM_SECTION_TABS.find((t) => t.id === value);
    if (tab) navigate(tab.href);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          {title && (
            <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              {title}
            </h1>
          )}
          <Tabs value={activeSection} onValueChange={handleTabChange}>
            <TabsList className="w-full sm:w-auto flex flex-wrap gap-x-6 gap-y-2 justify-start h-auto min-h-0 p-1 bg-muted/50">
              {CRM_SECTION_TAB_GROUPS.map((group) => (
                <React.Fragment key={group.label}>
                  <span
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center px-1 basis-full sm:basis-auto sm:contents"
                    aria-hidden
                  >
                    {group.label}
                  </span>
                  {group.tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="gap-2 shrink-0"
                      >
                        {Icon && <Icon className="h-4 w-4 shrink-0" />}
                        {tab.label}
                      </TabsTrigger>
                    );
                  })}
                </React.Fragment>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 sm:p-6">{children}</div>
    </div>
  );
}
