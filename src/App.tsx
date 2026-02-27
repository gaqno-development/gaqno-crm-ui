import { lazy, Suspense } from "react";
import {
  AuthProvider,
  QueryProvider,
  TenantProvider,
} from "@gaqno-development/frontcore";
import { Routes, Route, Navigate } from "react-router-dom";
import { CRMPageLayout } from "./layouts/CRMPageLayout";

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
    <div className="flex items-center justify-center p-6">
      <div className="animate-pulse text-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

function CRMRoutes() {
  return (
    <CRMPageLayout title="CRM">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="dashboard" element={<Navigate to="overview" replace />} />
          <Route path="dashboard/overview" element={<OverviewPage />} />
          <Route path="dashboard/kpis" element={<KpisPage />} />
          <Route path="dashboard/activity-feed" element={<ActivityFeedPage />} />
          <Route path="dashboard/alerts" element={<AlertsPage />} />

          <Route path="sales" element={<Navigate to="leads" replace />} />
          <Route path="sales/leads" element={<LeadsPage />} />
          <Route path="sales/opportunities" element={<OpportunitiesPage />} />
          <Route path="sales/deals" element={<DealsPage />} />
          <Route path="sales/quotes" element={<QuotesPage />} />
          <Route path="sales/contracts" element={<ContractsPage />} />
          <Route path="sales/orders" element={<OrdersPage />} />

          <Route path="customers" element={<Navigate to="accounts" replace />} />
          <Route path="customers/accounts" element={<AccountsPage />} />
          <Route path="customers/contacts" element={<ContactsPage />} />
          <Route path="customers/profiles" element={<ProfilesPage />} />
          <Route path="customers/ai-content" element={<AIContentPage />} />
          <Route path="customers/interaction-history" element={<InteractionHistoryPage />} />
          <Route path="customers/support-tickets" element={<SupportTicketsPage />} />

          <Route path="inventory" element={<Navigate to="products" replace />} />
          <Route path="inventory/products" element={<ProductsPage />} />
          <Route path="inventory/categories" element={<CategoriesPage />} />
          <Route path="inventory/stock-levels" element={<StockLevelsPage />} />
          <Route path="inventory/warehouses" element={<WarehousesPage />} />
          <Route path="inventory/suppliers" element={<SuppliersPage />} />

          <Route path="operations" element={<Navigate to="order-fulfillment" replace />} />
          <Route path="operations/order-fulfillment" element={<OrderFulfillmentPage />} />
          <Route path="operations/shipping" element={<ShippingPage />} />
          <Route path="operations/returns" element={<ReturnsPage />} />
          <Route path="operations/invoicing" element={<InvoicingPage />} />

          <Route path="finance" element={<Navigate to="invoices" replace />} />
          <Route path="finance/invoices" element={<InvoicesPage />} />
          <Route path="finance/payments" element={<PaymentsPage />} />
          <Route path="finance/pricing-rules" element={<PricingRulesPage />} />
          <Route path="finance/taxes" element={<TaxesPage />} />

          <Route path="reports" element={<Navigate to="analytics" replace />} />
          <Route path="reports/analytics" element={<AnalyticsPage />} />
          <Route path="reports/sales-reports" element={<SalesReportsPage />} />
          <Route path="reports/customer-insights" element={<CustomerInsightsPage />} />
          <Route path="reports/inventory-reports" element={<InventoryReportsPage />} />
          <Route path="reports/financial-reports" element={<FinancialReportsPage />} />
          <Route path="reports/custom-reports" element={<CustomReportsPage />} />

          <Route path="automation" element={<Navigate to="workflows" replace />} />
          <Route path="automation/workflows" element={<WorkflowsPage />} />
          <Route path="automation/ai-campaigns" element={<AICampaignsPage />} />
          <Route path="automation/triggers" element={<TriggersPage />} />
          <Route path="automation/webhooks" element={<WebhooksPage />} />
          <Route path="automation/integrations" element={<IntegrationsPage />} />

          <Route path="ai-marketing" element={<Navigate to="video" replace />} />
          <Route path="ai-marketing/video" element={<AIVideoPage />} />
          <Route path="ai-marketing/distribution" element={<DistributionPage />} />

          <Route path="administration" element={<Navigate to="users" replace />} />
          <Route path="administration/users" element={<AdminUsersPage />} />
          <Route path="administration/permissions" element={<PermissionsPage />} />
          <Route path="administration/teams" element={<AdminTeamsPage />} />
          <Route path="administration/audit-logs" element={<AuditLogsPage />} />
          <Route path="administration/system-settings" element={<SystemSettingsPage />} />

          <Route path="settings" element={<Navigate to="organization" replace />} />
          <Route path="settings/organization" element={<OrganizationPage />} />
          <Route path="settings/custom-fields" element={<CustomFieldsPage />} />
          <Route path="settings/pipelines" element={<PipelinesPage />} />
          <Route path="settings/notifications" element={<NotificationsPage />} />
          <Route path="settings/api-keys" element={<ApiKeysPage />} />

          <Route path="*" element={<Navigate to="dashboard/overview" replace />} />
        </Routes>
      </Suspense>
    </CRMPageLayout>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <TenantProvider>
          <CRMRoutes />
        </TenantProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
