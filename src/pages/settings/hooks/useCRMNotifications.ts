import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { NotificationSetting } from "../types";

export function useCRMNotifications() {
  const { data: settings = [], isLoading } = useQuery({
    queryKey: ["crm", "notification-settings"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<NotificationSetting[]>("/notification-settings");
      return data;
    },
  });
  return { settings, isLoading };
}
