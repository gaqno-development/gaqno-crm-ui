import React, { lazy, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import { initI18n, I18nProvider } from "@gaqno-development/frontcore/i18n";
import { Spinner } from "@gaqno-development/frontcore/components/ui";
import { CRMPageLayout } from "./layouts/CRMPageLayout";

initI18n();

const CRM_SEGMENT = "/crm";
const CRM_DEFAULT_VIEW = "dashboard/overview";

function crmPathFromLocation(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, "").replace(/^\/+/, "");
  if (normalized === "crm") return CRM_DEFAULT_VIEW;
  if (normalized.startsWith("crm/")) return normalized.slice(4) || CRM_DEFAULT_VIEW;
  const crmIndex = normalized.indexOf(CRM_SEGMENT);
  const rest =
    crmIndex >= 0
      ? normalized.slice(crmIndex + CRM_SEGMENT.length).replace(/^\/+/, "")
      : normalized;
  return rest || CRM_DEFAULT_VIEW;
}

function CRMNotFoundPage() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-center">
      <p className="font-semibold text-foreground">Página não encontrada</p>
      <p className="mt-2 text-sm text-muted-foreground">
        A rota solicitada não existe no CRM.
      </p>
      <Link
        to={`/crm/${CRM_DEFAULT_VIEW}`}
        className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline transition-opacity duration-200 hover:opacity-90"
      >
        Voltar ao Overview
      </Link>
    </div>
  );
}

const OverviewPage = lazy(() => import("./pages/OverviewPage/OverviewPage"));
const KpisPage = lazy(() => import("./pages/dashboard/KpisPage"));
const ActivityFeedPage = lazy(() => import("./pages/dashboard/ActivityFeedPage"));
const AlertsPage = lazy(() => import("./pages/dashboard/AlertsPage"));

const LeadsPage = lazy(() => import("./pages/LeadsPage/LeadsPage"));
const DealsPage = lazy(() => import("./pages/DealsPage/DealsPage"));
const OpportunitiesPage = lazy(() => import("./pages/sales/OpportunitiesPage"));
const QuotesPage = lazy(() => import("./pages/sales/QuotesPage"));
const ContractsPage = lazy(() => import("./pages/sales/ContractsPage"));
const OrdersPage = lazy(() => import("./pages/sales/OrdersPage"));

const AccountsPage = lazy(() => import("./pages/customers/AccountsPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const ProfilesPage = lazy(() => import("./pages/customers/ProfilesPage"));
const AIContentPage = lazy(() => import("./pages/customers/AIContentPage"));
const InteractionHistoryPage = lazy(() => import("./pages/InteractionHistoryPage/InteractionHistoryPage"));
const SupportTicketsPage = lazy(() => import("./pages/customers/SupportTicketsPage"));

const ProductsPage = lazy(() => import("./pages/inventory/ProductsPage"));
const CategoriesPage = lazy(() => import("./pages/inventory/CategoriesPage"));
const StockLevelsPage = lazy(() => import("./pages/inventory/StockLevelsPage"));
const WarehousesPage = lazy(() => import("./pages/inventory/WarehousesPage"));
const SuppliersPage = lazy(() => import("./pages/inventory/SuppliersPage"));

const OrderFulfillmentPage = lazy(() => import("./pages/operations/OrderFulfillmentPage"));
const ShippingPage = lazy(() => import("./pages/operations/ShippingPage"));
const ReturnsPage = lazy(() => import("./pages/operations/ReturnsPage"));
const InvoicingPage = lazy(() => import("./pages/operations/InvoicingPage"));

const InvoicesPage = lazy(() => import("./pages/finance/InvoicesPage"));
const PaymentsPage = lazy(() => import("./pages/finance/PaymentsPage"));
const PricingRulesPage = lazy(() => import("./pages/finance/PricingRulesPage"));
const TaxesPage = lazy(() => import("./pages/finance/TaxesPage"));

const AnalyticsPage = lazy(() => import("./pages/reports/AnalyticsPage"));
const SalesReportsPage = lazy(() => import("./pages/reports/SalesReportsPage"));
const CustomerInsightsPage = lazy(() => import("./pages/reports/CustomerInsightsPage"));
const InventoryReportsPage = lazy(() => import("./pages/reports/InventoryReportsPage"));
const FinancialReportsPage = lazy(() => import("./pages/reports/FinancialReportsPage"));
const CustomReportsPage = lazy(() => import("./pages/reports/CustomReportsPage"));

const WorkflowsPage = lazy(() => import("./pages/automation/WorkflowsPage"));
const AICampaignsPage = lazy(() => import("./pages/automation/AICampaignsPage"));
const TriggersPage = lazy(() => import("./pages/automation/TriggersPage"));
const WebhooksPage = lazy(() => import("./pages/automation/WebhooksPage"));
const IntegrationsPage = lazy(() => import("./pages/automation/IntegrationsPage"));

const AIVideoPage = lazy(() => import("./pages/ai-marketing/AIVideoPage"));
const DistributionPage = lazy(() => import("./pages/ai-marketing/DistributionPage"));

const AdminUsersPage = lazy(() => import("./pages/administration/UsersPage"));
const PermissionsPage = lazy(() => import("./pages/administration/PermissionsPage"));
const AdminTeamsPage = lazy(() => import("./pages/administration/TeamsPage"));
const AuditLogsPage = lazy(() => import("./pages/administration/AuditLogsPage"));
const SystemSettingsPage = lazy(() => import("./pages/administration/SystemSettingsPage"));

const OrganizationPage = lazy(() => import("./pages/settings/OrganizationPage"));
const CustomFieldsPage = lazy(() => import("./pages/settings/CustomFieldsPage"));
const PipelinesPage = lazy(() => import("./pages/settings/PipelinesPage"));
const NotificationsPage = lazy(() => import("./pages/settings/NotificationsPage"));
const ApiKeysPage = lazy(() => import("./pages/settings/ApiKeysPage"));

function Loading() {
  return (
    <div className="flex min-h-[200px] items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8 text-primary" />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

const PATH_TO_PAGE: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "dashboard/overview": OverviewPage,
  "dashboard/kpis": KpisPage,
  "dashboard/activity-feed": ActivityFeedPage,
  "dashboard/alerts": AlertsPage,
  "sales/leads": LeadsPage,
  "sales/opportunities": OpportunitiesPage,
  "sales/deals": DealsPage,
  "sales/quotes": QuotesPage,
  "sales/contracts": ContractsPage,
  "sales/orders": OrdersPage,
  "customers/accounts": AccountsPage,
  "customers/contacts": ContactsPage,
  "customers/profiles": ProfilesPage,
  "customers/ai-content": AIContentPage,
  "customers/interaction-history": InteractionHistoryPage,
  "customers/support-tickets": SupportTicketsPage,
  "inventory/products": ProductsPage,
  "inventory/categories": CategoriesPage,
  "inventory/stock-levels": StockLevelsPage,
  "inventory/warehouses": WarehousesPage,
  "inventory/suppliers": SuppliersPage,
  "operations/order-fulfillment": OrderFulfillmentPage,
  "operations/shipping": ShippingPage,
  "operations/returns": ReturnsPage,
  "operations/invoicing": InvoicingPage,
  "finance/invoices": InvoicesPage,
  "finance/payments": PaymentsPage,
  "finance/pricing-rules": PricingRulesPage,
  "finance/taxes": TaxesPage,
  "reports/analytics": AnalyticsPage,
  "reports/sales-reports": SalesReportsPage,
  "reports/customer-insights": CustomerInsightsPage,
  "reports/inventory-reports": InventoryReportsPage,
  "reports/financial-reports": FinancialReportsPage,
  "reports/custom-reports": CustomReportsPage,
  "automation/workflows": WorkflowsPage,
  "automation/ai-campaigns": AICampaignsPage,
  "automation/triggers": TriggersPage,
  "automation/webhooks": WebhooksPage,
  "automation/integrations": IntegrationsPage,
  "ai-marketing/video": AIVideoPage,
  "ai-marketing/distribution": DistributionPage,
  "administration/users": AdminUsersPage,
  "administration/permissions": PermissionsPage,
  "administration/teams": AdminTeamsPage,
  "administration/audit-logs": AuditLogsPage,
  "administration/system-settings": SystemSettingsPage,
  "settings/organization": OrganizationPage,
  "settings/custom-fields": CustomFieldsPage,
  "settings/pipelines": PipelinesPage,
  "settings/notifications": NotificationsPage,
  "settings/api-keys": ApiKeysPage,
};

function renderView(path: string) {
  const Page = PATH_TO_PAGE[path];
  if (!Page) return <CRMNotFoundPage />;
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
}

function CRMPage() {
  const pathname = useLocation().pathname;
  const path = crmPathFromLocation(pathname);
  return (
    <CRMPageLayout title="CRM">
      {renderView(path)}
    </CRMPageLayout>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <CRMPage />
    </I18nProvider>
  );
}
