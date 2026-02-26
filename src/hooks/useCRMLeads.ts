import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import { Plus, Users, TrendingUp, AlertCircle } from "lucide-react";
import type { Lead, LeadStatus, LeadSource } from "../types/crm";

// ─── Option constants (single source of truth) ───────────────────────────────

export const LEAD_STATUS_OPTIONS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos os Status" },
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "qualified", label: "Qualificado" },
  { value: "lost", label: "Perdido" },
];

export const LEAD_SOURCE_OPTIONS: { value: LeadSource | "all"; label: string }[] = [
  { value: "all", label: "Todas as Fontes" },
  { value: "website", label: "Website" },
  { value: "referral", label: "Indicação" },
  { value: "cold-call", label: "Cold Call" },
  { value: "advertisement", label: "Anúncios" },
  { value: "event", label: "Evento" },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCRMLeads() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [source, setSource] = useState<LeadSource | "all">("all");

  const { data: leadsData = [], isLoading } = useQuery({
    queryKey: ["crm", "leads"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Lead[]>("/leads");
      return data;
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: async (newLead: Partial<Lead>) => {
      const { data } = await coreAxiosClient.crm.post<Lead>("/leads", newLead);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crm", "leads"] });
    },
  });

  const leads = useMemo<Lead[]>(() => {
    return leadsData.filter((lead: Lead) => {
      const matchSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company?.toLowerCase().includes(search.toLowerCase()) ||
        lead.email?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || lead.status === status;
      const matchSource = source === "all" || lead.source === source;
      return matchSearch && matchStatus && matchSource;
    });
  }, [leadsData, search, status, source]);

  const stats = useMemo(() => ({
    total: leadsData.length,
    new: leadsData.filter((l: Lead) => l.status === "new").length,
    contacted: leadsData.filter((l: Lead) => l.status === "contacted").length,
    qualified: leadsData.filter((l: Lead) => l.status === "qualified").length,
    lost: leadsData.filter((l: Lead) => l.status === "lost").length,
  }), [leadsData]);

  const statsData = useMemo(() => [
    {
      label: "Total",
      value: stats.total,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Novos",
      value: stats.new,
      icon: Plus,
      color: "text-blue-500",
    },
    {
      label: "Qualificados",
      value: stats.qualified,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      label: "Perdidos",
      value: stats.lost,
      icon: AlertCircle,
      color: "text-red-500",
    },
  ], [stats]);

  return {
    // data
    leads,
    stats,
    statsData,
    isLoading,
    createLead: createLeadMutation.mutateAsync,
    isCreating: createLeadMutation.isPending,
    // filter state
    search,
    setSearch,
    status,
    setStatus,
    source,
    setSource,
    // option lists consumed by selects
    statusOptions: LEAD_STATUS_OPTIONS,
    sourceOptions: LEAD_SOURCE_OPTIONS,
  };
}
