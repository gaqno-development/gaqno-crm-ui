import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageLayout, type PageLayoutTab, type PageLayoutTabGroup } from "@gaqno-development/frontcore/components/layout";
import { useTranslation } from "@gaqno-development/frontcore/i18n";
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

const TAB_KEYS = [
  { id: "dashboard", href: "/crm/dashboard/overview", icon: <LayoutDashboard className="h-4 w-4" />, tKey: "crm.dashboard" },
  { id: "sales", href: "/crm/sales/leads", icon: <TrendingUp className="h-4 w-4" />, tKey: "crm.sales" },
  { id: "customers", href: "/crm/customers/accounts", icon: <UsersIcon className="h-4 w-4" />, tKey: "crm.customers" },
  { id: "inventory", href: "/crm/inventory/products", icon: <Package className="h-4 w-4" />, tKey: "crm.inventory" },
  { id: "operations", href: "/crm/operations/order-fulfillment", icon: <ClipboardList className="h-4 w-4" />, tKey: "crm.operations" },
  { id: "finance", href: "/crm/finance/invoices", icon: <DollarSign className="h-4 w-4" />, tKey: "crm.finance" },
  { id: "reports", href: "/crm/reports/analytics", icon: <BarChart3 className="h-4 w-4" />, tKey: "crm.performance" },
  { id: "automation", href: "/crm/automation/workflows", icon: <TargetIcon className="h-4 w-4" />, tKey: "crm.automation" },
  { id: "ai-marketing", href: "/crm/ai-marketing/video", icon: <Sparkles className="h-4 w-4" />, tKey: "crm.aiMarketing" },
  { id: "administration", href: "/crm/administration/users", icon: <ShieldCheck className="h-4 w-4" />, tKey: "crm.administration" },
  { id: "settings", href: "/crm/settings/organization", icon: <GearIcon className="h-4 w-4" />, tKey: "crm.settings" },
] as const;

const GROUP_CONFIG = [
  { groupKey: "crm.groupOverview", tabIds: ["dashboard"] },
  { groupKey: "crm.groupBusiness", tabIds: ["sales", "customers", "inventory", "operations", "finance"] },
  { groupKey: "crm.groupInsights", tabIds: ["reports", "automation", "ai-marketing"] },
  { groupKey: "crm.groupAdministration", tabIds: ["administration", "settings"] },
] as const;

function getActiveSection(pathname: string): string {
  const sections = TAB_KEYS.map((t) => t.id);
  for (const section of sections) {
    if (pathname.startsWith(`/crm/${section}`)) return section;
  }
  return "dashboard";
}

export interface CRMPageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function CRMPageLayout({ children, title }: CRMPageLayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("navigation");
  const activeTab = getActiveSection(pathname);

  const tabs: PageLayoutTab[] = TAB_KEYS.map((tab) => ({
    id: tab.id,
    label: t(tab.tKey),
    icon: tab.icon,
    href: tab.href,
  }));

  const tabGroups: PageLayoutTabGroup[] = GROUP_CONFIG.map((group) => ({
    label: t(group.groupKey),
    tabs: group.tabIds.map((id) => tabs.find((tab) => tab.id === id)!),
  }));

  const handleTabChange = (tabId: string) => {
    const tab = TAB_KEYS.find((k) => k.id === tabId);
    if (tab) navigate(tab.href);
  };

  return (
    <PageLayout
      title={title ?? t("crm.title")}
      tabs={tabs}
      tabGroups={tabGroups}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      layoutId="crmActiveTab"
    >
      {children}
    </PageLayout>
  );
}

export default CRMPageLayout;
