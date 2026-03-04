import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Deal, DealStage } from "../types/crm";

export interface UseUpdateDealStageOptions {
  onSuccess?: (deal: Deal) => void;
}

export function useUpdateDealStage(options?: UseUpdateDealStageOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      dealId,
      stage,
    }: {
      dealId: string;
      stage: DealStage;
    }): Promise<Deal> => {
      const { data } = await coreAxiosClient.crm.patch<Deal>(`/deals/${dealId}`, {
        stage,
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["crm", "deals"] });
      options?.onSuccess?.(data);
    },
  });

  const updateDealStage = (dealId: string, stage: DealStage) => {
    mutation.mutate({ dealId, stage });
  };

  return {
    updateDealStage,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
