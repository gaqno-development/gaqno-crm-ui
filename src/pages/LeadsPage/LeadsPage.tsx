import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DataTable,
} from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMLeads } from "../../hooks/useCRMLeads";
import type { LeadStatus, LeadSource } from "../../../types/crm";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import { LEADS_COLUMNS } from "./components/LeadsConstants";
import { AddLeadDialog } from "./components/AddLeadDialog";

export default function LeadsPage() {
  const {
    leads,
    isLoading,
    createLead,
    isCreating,
    search,
    setSearch,
    status,
    setStatus,
    source,
    setSource,
    statusOptions,
    sourceOptions,
    statsData,
  } = useCRMLeads();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statsData.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3"
          >
            <div className={cn("p-2 rounded-lg bg-muted", color)}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={LEADS_COLUMNS}
        data={{ data: leads, isLoading }}
        showPagination={leads.length > 10}
        emptyMessage="Nenhum lead encontrado."
        renderToolbar={() => (
          <>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>

            <Select
              value={status}
              onValueChange={(v) => setStatus(v as LeadStatus | "all")}
            >
              <SelectTrigger className="h-9 w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={source}
              onValueChange={(v) => setSource(v as LeadSource | "all")}
            >
              <SelectTrigger className="h-9 w-36">
                <SelectValue placeholder="Fonte" />
              </SelectTrigger>
              <SelectContent>
                {sourceOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AddLeadDialog
              onSuccess={async (newLead) => {
                await createLead(newLead);
              }}
              isCreating={isCreating}
              sourceOptions={sourceOptions}
            />
          </>
        )}
      />
    </div>
  );
}
