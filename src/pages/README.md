# CRM pages status

All routes exist and resolve; no 404s. Behavior:

## CRM style checklist

Validate every new or updated page against this list before merge:

- **Layout**: `div className="space-y-4"` or `space-y-5`; top stats row when relevant: `grid grid-cols-2 sm:grid-cols-4 gap-3` with `rounded-xl border border-border bg-card px-4 py-3`.
- **Cards**: `Card` + `CardHeader` (CardTitle, CardDescription or `text-sm text-muted-foreground`) + `CardContent` from `@gaqno-development/frontcore/components`.
- **Lists/tables**: `DataTable` with `columns`, `data={{ data, isLoading }}`, `emptyMessage`, `renderToolbar` (search + filters + primary action) or manual list + `EmptyState` from frontcore.
- **Search/filters**: `Input` with icon (Search or MagnifierIcon) in `relative max-w-sm` / `pl-9 h-9`; `Select` for filters.
- **Loading**: `LoaderPinwheelIcon` or `Loader2` in a centered `div` with `py-12`; or DataTable built-in loading.
- **Empty**: `EmptyState` (icon, title, description, size) from frontcore; Portuguese copy (e.g. "Nenhum … encontrado").
- **Logic**: All in a hook (`useCRM…` or `use…Page`); page component is composition-only. Hook uses `useQuery`/`useMutation` and `coreAxiosClient.crm` when API exists.
- **Constants**: Status/option configs and column defs in `*Constants.ts(x)` or inside the hook.
- **Copy**: Portuguese for labels, placeholders, empty messages, and descriptions.
- **Icons**: Lucide or `@gaqno-development/frontcore/components/icons`; stats cards use small icon in `p-2 rounded-lg bg-muted` + optional color class.

## Functional (full UI + API)

| Section     | Page                | Route                                      |
|------------|---------------------|--------------------------------------------|
| Dashboard  | Overview            | `/crm/dashboard/overview`                   |
| Dashboard  | Activity Feed       | `/crm/dashboard/activity-feed`             |
| Dashboard  | KPIs                | `/crm/dashboard/kpis`                      |
| Dashboard  | Alerts              | `/crm/dashboard/alerts`                    |
| Sales      | Leads               | `/crm/sales/leads`                         |
| Sales      | Deals               | `/crm/sales/deals`                         |
| Sales      | Opportunities       | `/crm/sales/opportunities`                 |
| Sales      | Quotes, Contracts, Orders | (list/table UI, stub data)           |
| Customers  | Accounts            | `/crm/customers/accounts`                  |
| Customers  | Contacts            | `/crm/customers/contacts`                  |
| Customers  | Profiles, Support Tickets | (list/table UI, stub data)            |
| Customers  | Interaction History | `/crm/customers/interaction-history`      |
| Customers  | AI Content          | `/crm/customers/ai-content`                |
| Inventory  | Products, Categories, Stock, Warehouses, Suppliers | (list/table UI, stub data) |
| Operations | Fulfillment, Shipping, Returns, Invoicing | (list/table UI, stub data) |
| Finance    | Invoices, Payments, Pricing Rules, Taxes | (list/table UI, stub data) |
| Reports    | Analytics, Sales, Customer Insights | (existing API); Inventory, Financial, Custom | (stub) |
| Automation | Workflows, AI Campaigns, Triggers, Webhooks, Integrations | (list/table UI, stub data) |
| Administration | Users, Permissions, Teams, Audit Logs, System Settings | (list/table UI, stub data) |
| Settings   | Organization, Custom Fields, Pipelines, Notifications, API Keys | (list/table UI or EmptyState, stub data) |
| AI Marketing | Video             | `/crm/ai-marketing/video`                  |
| AI Marketing | Distribution      | `/crm/ai-marketing/distribution`           |

## Placeholder (“content coming soon”)

None; all CRM placeholder pages have been replaced with styled list/table or report pages (Wave 1: real API; Wave 2: stub data, TODO for backend).
