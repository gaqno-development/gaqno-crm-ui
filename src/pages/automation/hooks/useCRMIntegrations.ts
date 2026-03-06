import { useMemo, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Integration, SyncResult } from "../types";

export function useCRMIntegrations() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "integrations"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Integration[]>("/integrations");
      return data;
    },
  });

  const integrations = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((i) => i.name?.toLowerCase().includes(s));
  }, [rawData, search]);

  const connectMutation = useMutation({
    mutationFn: async (provider: string) => {
      const { data } = await coreAxiosClient.crm.get<{ url: string }>(
        `/integrations/${provider}/auth-url`,
      );
      return data.url;
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
  });

  const syncMutation = useMutation({
    mutationFn: async (provider: string) => {
      const { data } = await coreAxiosClient.crm.post<SyncResult>(
        `/integrations/${provider}/sync`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crm", "integrations"] });
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: async (provider: string) => {
      await coreAxiosClient.crm.delete(`/integrations/${provider}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crm", "integrations"] });
    },
  });

  const connect = useCallback(
    (provider: string) => connectMutation.mutate(provider),
    [connectMutation],
  );

  const sync = useCallback(
    (provider: string) => syncMutation.mutate(provider),
    [syncMutation],
  );

  const disconnect = useCallback(
    (provider: string) => disconnectMutation.mutate(provider),
    [disconnectMutation],
  );

  return {
    integrations,
    isLoading,
    search,
    setSearch,
    connect,
    sync,
    disconnect,
    isSyncing: syncMutation.isPending,
    isConnecting: connectMutation.isPending,
    isDisconnecting: disconnectMutation.isPending,
    syncError: syncMutation.error,
    syncResult: syncMutation.data,
  };
}
