import { toast } from "sonner";
import { useCRMDeals } from "../../../hooks/useCRMDeals";
import { useUpdateDealStage } from "../../../hooks/useUpdateDealStage";

export function useDealsPage() {
  const dealsData = useCRMDeals();
  const { updateDealStage } = useUpdateDealStage({
    onSuccess: (deal) => {
      if (deal.stage === "won") {
        toast.success("Deal marked as won — receivable created in Finance");
      } else if (deal.stage === "lost") {
        toast.success("Deal marked as lost");
      }
    },
  });
  return { ...dealsData, updateDealStage };
}
