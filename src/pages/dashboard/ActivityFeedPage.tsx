import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { EmptyState } from "@gaqno-development/frontcore/components/ui";
import { LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { UsersIcon } from "@gaqno-development/frontcore/components/icons";
import { useCRMInteractions } from "../../hooks/useCRMContacts";
import { ActivityFeedList } from "./ActivityFeedList";

export default function ActivityFeedPage() {
  const { interactions, isLoading } = useCRMInteractions();

  const recentInteractions = interactions.slice(0, 50);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <p className="text-sm text-muted-foreground">
            Recent interactions across contacts — WhatsApp, email, phone, notes and meetings.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}

          {!isLoading && recentInteractions.length === 0 && (
            <EmptyState
              icon={UsersIcon}
              title="Nenhuma atividade recente"
              description="As interações com contatos aparecerão aqui."
              size="sm"
            />
          )}

          {!isLoading && recentInteractions.length > 0 && (
            <ActivityFeedList interactions={recentInteractions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
