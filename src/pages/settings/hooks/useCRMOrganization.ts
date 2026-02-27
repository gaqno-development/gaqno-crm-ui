import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Organization } from "../types";

export function useCRMOrganization() {
  const { data: organization = null, isLoading } = useQuery({
    queryKey: ["crm", "organization"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Organization | null>("/organization");
      return data ?? null;
    },
  });
  return { organization, isLoading };
}
