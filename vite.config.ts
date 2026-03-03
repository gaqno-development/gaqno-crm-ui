/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { FEDERATION_SHARED } from "@gaqno-development/frontcore/config/federation-shared";

export default defineConfig(async () => {
  const tailwindcss = (await import("@tailwindcss/vite")).default;

  return {
    base: "/",
    resolve: { dedupe: ["motion"] },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test-setup.ts"],
    },
    server: {
      port: 3003,
      origin: "http://localhost:3003",
      fs: {
        allow: [".", "../shared"],
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "crm",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.tsx",
          "./CRMPageLayout": "./src/layouts/CRMPageLayout.tsx",
          "./OverviewPage": "./src/pages/OverviewPage/OverviewPage.tsx",
          "./KpisPage": "./src/pages/dashboard/KpisPage.tsx",
          "./ActivityFeedPage": "./src/pages/dashboard/ActivityFeedPage.tsx",
          "./AlertsPage": "./src/pages/dashboard/AlertsPage.tsx",
          "./LeadsPage": "./src/pages/LeadsPage/LeadsPage.tsx",
          "./DealsPage": "./src/pages/DealsPage/DealsPage.tsx",
          "./OpportunitiesPage": "./src/pages/sales/OpportunitiesPage.tsx",
          "./QuotesPage": "./src/pages/sales/QuotesPage.tsx",
          "./ContractsPage": "./src/pages/sales/ContractsPage.tsx",
          "./OrdersPage": "./src/pages/sales/OrdersPage.tsx",
          "./AccountsPage": "./src/pages/customers/AccountsPage.tsx",
          "./ContactsPage": "./src/pages/ContactsPage/ContactsPage.tsx",
          "./ProfilesPage": "./src/pages/customers/ProfilesPage.tsx",
          "./AIContentPage": "./src/pages/customers/AIContentPage.tsx",
          "./InteractionHistoryPage": "./src/pages/InteractionHistoryPage/InteractionHistoryPage.tsx",
          "./SupportTicketsPage": "./src/pages/customers/SupportTicketsPage.tsx",
          "./ProductsPage": "./src/pages/inventory/ProductsPage.tsx",
          "./CategoriesPage": "./src/pages/inventory/CategoriesPage.tsx",
          "./StockLevelsPage": "./src/pages/inventory/StockLevelsPage.tsx",
          "./WarehousesPage": "./src/pages/inventory/WarehousesPage.tsx",
          "./SuppliersPage": "./src/pages/inventory/SuppliersPage.tsx",
          "./OrderFulfillmentPage": "./src/pages/operations/OrderFulfillmentPage.tsx",
          "./ShippingPage": "./src/pages/operations/ShippingPage.tsx",
          "./ReturnsPage": "./src/pages/operations/ReturnsPage.tsx",
          "./InvoicingPage": "./src/pages/operations/InvoicingPage.tsx",
          "./InvoicesPage": "./src/pages/finance/InvoicesPage.tsx",
          "./PaymentsPage": "./src/pages/finance/PaymentsPage.tsx",
          "./PricingRulesPage": "./src/pages/finance/PricingRulesPage.tsx",
          "./TaxesPage": "./src/pages/finance/TaxesPage.tsx",
          "./AnalyticsPage": "./src/pages/reports/AnalyticsPage.tsx",
          "./SalesReportsPage": "./src/pages/reports/SalesReportsPage.tsx",
          "./CustomerInsightsPage": "./src/pages/reports/CustomerInsightsPage.tsx",
          "./InventoryReportsPage": "./src/pages/reports/InventoryReportsPage.tsx",
          "./FinancialReportsPage": "./src/pages/reports/FinancialReportsPage.tsx",
          "./CustomReportsPage": "./src/pages/reports/CustomReportsPage.tsx",
          "./WorkflowsPage": "./src/pages/automation/WorkflowsPage.tsx",
          "./AICampaignsPage": "./src/pages/automation/AICampaignsPage.tsx",
          "./TriggersPage": "./src/pages/automation/TriggersPage.tsx",
          "./WebhooksPage": "./src/pages/automation/WebhooksPage.tsx",
          "./IntegrationsPage": "./src/pages/automation/IntegrationsPage.tsx",
          "./AIVideoPage": "./src/pages/ai-marketing/AIVideoPage.tsx",
          "./DistributionPage": "./src/pages/ai-marketing/DistributionPage.tsx",
          "./AdminUsersPage": "./src/pages/administration/UsersPage.tsx",
          "./PermissionsPage": "./src/pages/administration/PermissionsPage.tsx",
          "./AdminTeamsPage": "./src/pages/administration/TeamsPage.tsx",
          "./AuditLogsPage": "./src/pages/administration/AuditLogsPage.tsx",
          "./SystemSettingsPage": "./src/pages/administration/SystemSettingsPage.tsx",
          "./OrganizationPage": "./src/pages/settings/OrganizationPage.tsx",
          "./CustomFieldsPage": "./src/pages/settings/CustomFieldsPage.tsx",
          "./PipelinesPage": "./src/pages/settings/PipelinesPage.tsx",
          "./NotificationsPage": "./src/pages/settings/NotificationsPage.tsx",
          "./ApiKeysPage": "./src/pages/settings/ApiKeysPage.tsx",
        },
        shared: FEDERATION_SHARED as any,
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
        requireReturnsDefault: "preferred",
      },
      rollupOptions: {
        output: { format: "es" },
      },
    },
    optimizeDeps: { include: ["motion", "use-sync-external-store"] },
  } as any;
});
