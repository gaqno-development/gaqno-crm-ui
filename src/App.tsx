import {
  AuthProvider,
  QueryProvider,
  TenantProvider,
} from "@gaqno-development/frontcore";
import { SectionWithSubNav } from "@gaqno-development/frontcore/components";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React from "react";
import {
  DASHBOARD_BASE,
  DASHBOARD_DEFAULT,
  DASHBOARD_CHILDREN,
  SALES_BASE,
  SALES_DEFAULT,
  SALES_CHILDREN,
  CUSTOMERS_BASE,
  CUSTOMERS_DEFAULT,
  CUSTOMERS_CHILDREN,
  INVENTORY_BASE,
  INVENTORY_DEFAULT,
  INVENTORY_CHILDREN,
  OPERATIONS_BASE,
  OPERATIONS_DEFAULT,
  OPERATIONS_CHILDREN,
  FINANCE_BASE,
  FINANCE_DEFAULT,
  FINANCE_CHILDREN,
  REPORTS_BASE,
  REPORTS_DEFAULT,
  REPORTS_CHILDREN,
  AUTOMATION_BASE,
  AUTOMATION_DEFAULT,
  AUTOMATION_CHILDREN,
  ADMINISTRATION_BASE,
  ADMINISTRATION_DEFAULT,
  ADMINISTRATION_CHILDREN,
  SETTINGS_BASE,
  SETTINGS_DEFAULT,
  SETTINGS_CHILDREN,
  SECTION_CONFIG,
} from "./config/sections";
import {
  OverviewPage,
  KpisPage,
  ActivityFeedPage,
  AlertsPage,
} from "./pages/dashboard";
import {
  LeadsPage,
  OpportunitiesPage,
  DealsPage,
  QuotesPage,
  ContractsPage,
  OrdersPage,
} from "./pages/sales";
import {
  AccountsPage,
  ContactsPage,
  ProfilesPage,
  InteractionHistoryPage,
  SupportTicketsPage,
} from "./pages/customers";
import {
  ProductsPage,
  CategoriesPage,
  StockLevelsPage,
  WarehousesPage,
  SuppliersPage,
} from "./pages/inventory";
import {
  OrderFulfillmentPage,
  ShippingPage,
  ReturnsPage,
  InvoicingPage,
} from "./pages/operations";
import {
  InvoicesPage,
  PaymentsPage,
  PricingRulesPage,
  TaxesPage,
} from "./pages/finance";
import {
  AnalyticsPage,
  SalesReportsPage,
  CustomerInsightsPage,
  InventoryReportsPage,
  FinancialReportsPage,
  CustomReportsPage,
} from "./pages/reports";
import {
  WorkflowsPage,
  TriggersPage,
  WebhooksPage,
  IntegrationsPage,
} from "./pages/automation";
import {
  UsersPage,
  PermissionsPage,
  TeamsPage,
  AuditLogsPage,
  SystemSettingsPage,
} from "./pages/administration";
import {
  OrganizationPage,
  CustomFieldsPage,
  PipelinesPage,
  NotificationsPage,
  ApiKeysPage,
} from "./pages/settings";
import { CRMPageLayout } from "./layouts";

const breadcrumb = SECTION_CONFIG.breadcrumbRoot;

function DashboardSection() {
  return (
    <SectionWithSubNav
      basePath={DASHBOARD_BASE}
      defaultSegment={DASHBOARD_DEFAULT}
      children={DASHBOARD_CHILDREN}
      segmentToComponent={{
        overview: OverviewPage,
        kpis: KpisPage,
        "activity-feed": ActivityFeedPage,
        alerts: AlertsPage,
      }}
      title="Dashboard"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function SalesSection() {
  return (
    <SectionWithSubNav
      basePath={SALES_BASE}
      defaultSegment={SALES_DEFAULT}
      children={SALES_CHILDREN}
      segmentToComponent={{
        leads: LeadsPage,
        opportunities: OpportunitiesPage,
        deals: DealsPage,
        quotes: QuotesPage,
        contracts: ContractsPage,
        orders: OrdersPage,
      }}
      title="Sales"
      variant="horizontal"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function CustomersSection() {
  return (
    <SectionWithSubNav
      basePath={CUSTOMERS_BASE}
      defaultSegment={CUSTOMERS_DEFAULT}
      children={CUSTOMERS_CHILDREN}
      segmentToComponent={{
        accounts: AccountsPage,
        contacts: ContactsPage,
        profiles: ProfilesPage,
        "interaction-history": InteractionHistoryPage,
        "support-tickets": SupportTicketsPage,
      }}
      title="Customers"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function InventorySection() {
  return (
    <SectionWithSubNav
      basePath={INVENTORY_BASE}
      defaultSegment={INVENTORY_DEFAULT}
      children={INVENTORY_CHILDREN}
      segmentToComponent={{
        products: ProductsPage,
        categories: CategoriesPage,
        "stock-levels": StockLevelsPage,
        warehouses: WarehousesPage,
        suppliers: SuppliersPage,
      }}
      title="Inventory"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function OperationsSection() {
  return (
    <SectionWithSubNav
      basePath={OPERATIONS_BASE}
      defaultSegment={OPERATIONS_DEFAULT}
      children={OPERATIONS_CHILDREN}
      segmentToComponent={{
        "order-fulfillment": OrderFulfillmentPage,
        shipping: ShippingPage,
        returns: ReturnsPage,
        invoicing: InvoicingPage,
      }}
      title="Operations"
      variant="horizontal"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function FinanceSection() {
  return (
    <SectionWithSubNav
      basePath={FINANCE_BASE}
      defaultSegment={FINANCE_DEFAULT}
      children={FINANCE_CHILDREN}
      segmentToComponent={{
        invoices: InvoicesPage,
        payments: PaymentsPage,
        "pricing-rules": PricingRulesPage,
        taxes: TaxesPage,
      }}
      title="Finance"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function ReportsSection() {
  return (
    <SectionWithSubNav
      basePath={REPORTS_BASE}
      defaultSegment={REPORTS_DEFAULT}
      children={REPORTS_CHILDREN}
      segmentToComponent={{
        analytics: AnalyticsPage,
        "sales-reports": SalesReportsPage,
        "customer-insights": CustomerInsightsPage,
        "inventory-reports": InventoryReportsPage,
        "financial-reports": FinancialReportsPage,
        "custom-reports": CustomReportsPage,
      }}
      title="Reports"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function AutomationSection() {
  return (
    <SectionWithSubNav
      basePath={AUTOMATION_BASE}
      defaultSegment={AUTOMATION_DEFAULT}
      children={AUTOMATION_CHILDREN}
      segmentToComponent={{
        workflows: WorkflowsPage,
        triggers: TriggersPage,
        webhooks: WebhooksPage,
        integrations: IntegrationsPage,
      }}
      title="Automation"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function AdministrationSection() {
  return (
    <SectionWithSubNav
      basePath={ADMINISTRATION_BASE}
      defaultSegment={ADMINISTRATION_DEFAULT}
      children={ADMINISTRATION_CHILDREN}
      segmentToComponent={{
        users: UsersPage,
        permissions: PermissionsPage,
        teams: TeamsPage,
        "audit-logs": AuditLogsPage,
        "system-settings": SystemSettingsPage,
      }}
      title="Administration"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function SettingsSection() {
  return (
    <SectionWithSubNav
      basePath={SETTINGS_BASE}
      defaultSegment={SETTINGS_DEFAULT}
      children={SETTINGS_CHILDREN}
      segmentToComponent={{
        organization: OrganizationPage,
        "custom-fields": CustomFieldsPage,
        pipelines: PipelinesPage,
        notifications: NotificationsPage,
        "api-keys": ApiKeysPage,
      }}
      title="Settings"
      variant="vertical"
      breadcrumbRoot={breadcrumb}
      enableContentTransition
    />
  );
}

function CRMRouter() {
  const { pathname } = useLocation();

  if (pathname === "/crm" || pathname === "/crm/") {
    return <Navigate to="/crm/dashboard" replace />;
  }

  let sectionContent: React.ReactNode = null;
  if (pathname.startsWith("/crm/dashboard"))
    sectionContent = <DashboardSection />;
  else if (pathname.startsWith("/crm/sales")) sectionContent = <SalesSection />;
  else if (pathname.startsWith("/crm/customers"))
    sectionContent = <CustomersSection />;
  else if (pathname.startsWith("/crm/inventory"))
    sectionContent = <InventorySection />;
  else if (pathname.startsWith("/crm/operations"))
    sectionContent = <OperationsSection />;
  else if (pathname.startsWith("/crm/finance"))
    sectionContent = <FinanceSection />;
  else if (pathname.startsWith("/crm/reports"))
    sectionContent = <ReportsSection />;
  else if (pathname.startsWith("/crm/automation"))
    sectionContent = <AutomationSection />;
  else if (pathname.startsWith("/crm/administration"))
    sectionContent = <AdministrationSection />;
  else if (pathname.startsWith("/crm/settings"))
    sectionContent = <SettingsSection />;

  if (sectionContent) {
    return <CRMPageLayout title="CRM">{sectionContent}</CRMPageLayout>;
  }

  return (
    <CRMPageLayout title="CRM">
      <h1 className="text-3xl font-bold">CRM Module</h1>
      <p className="text-muted-foreground mt-2">Page not found.</p>
    </CRMPageLayout>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <TenantProvider>
          <Routes>
            <Route path="*" element={<CRMRouter />} />
          </Routes>
        </TenantProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
