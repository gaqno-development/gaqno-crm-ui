import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { EmptyState, LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { FileDescriptionIcon } from "@gaqno-development/frontcore/components/icons";
import { useCustomReportsPage } from "./hooks/useCustomReportsPage";
import { formatDate } from "@gaqno-development/frontcore/utils";

export default function CustomReportsPage() {
  const { reports, isLoading } = useCustomReportsPage();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios personalizados</CardTitle>
          <p className="text-sm text-muted-foreground">
            Relatórios salvos e configurados por você.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && reports.length === 0 && (
            <EmptyState
              icon={FileDescriptionIcon}
              title="Nenhum relatório personalizado"
              description="Crie relatórios personalizados para ver aqui."
              size="sm"
            />
          )}
          {!isLoading && reports.length > 0 && (
            <ul className="space-y-3">
              {reports.map((r) => (
                <li
                  key={r.id}
                  className="rounded-lg border border-border bg-muted/30 px-4 py-3 flex flex-col gap-1"
                >
                  <p className="font-medium text-sm">{r.name}</p>
                  {r.description && (
                    <p className="text-sm text-muted-foreground">{r.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Atualizado: {formatDate(r.updatedAt, { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
