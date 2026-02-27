import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { DataTable } from "@gaqno-development/frontcore/components/ui";
import { useCRMNotifications } from "./hooks/useCRMNotifications";
import { NOTIFICATION_SETTINGS_COLUMNS } from "./components/SettingsListColumns";

export default function NotificationsPage() {
  const { settings, isLoading } = useCRMNotifications();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <p className="text-sm text-muted-foreground">
            Canais e preferências de notificação.
          </p>
        </CardHeader>
        <CardContent>
          <DataTable columns={NOTIFICATION_SETTINGS_COLUMNS} data={{ data: settings, isLoading }} showPagination={settings.length > 10} emptyMessage="Nenhuma configuração de notificação encontrada." />
        </CardContent>
      </Card>
    </div>
  );
}
