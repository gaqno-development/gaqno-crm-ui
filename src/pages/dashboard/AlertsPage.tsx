import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { EmptyState, LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { TriangleAlertIcon } from "@gaqno-development/frontcore/components/icons";
import { useAlertsPage } from "./hooks/useAlertsPage";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AlertsPage() {
  const { alerts, isLoading } = useAlertsPage();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Alertas e notificações</CardTitle>
          <p className="text-sm text-muted-foreground">
            Oportunidades paradas e contatos sem interação recente.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && alerts.length === 0 && (
            <EmptyState
              icon={TriangleAlertIcon}
              title="Nenhum alerta no momento"
              description="Quando houver oportunidades paradas ou contatos sem interação, eles aparecerão aqui."
              size="sm"
            />
          )}
          {!isLoading && alerts.length > 0 && (
            <ul className="space-y-3">
              {alerts.map((a) => (
                <li
                  key={a.id}
                  className="rounded-lg border border-border bg-muted/30 px-4 py-3 flex flex-col gap-1"
                >
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(a.date)}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
