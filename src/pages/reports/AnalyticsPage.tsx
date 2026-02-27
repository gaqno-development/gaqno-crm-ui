import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { useAnalyticsPage } from "./hooks/useAnalyticsPage";

export default function AnalyticsPage() {
  const { blocks, byStage, bySource, isLoading } = useAnalyticsPage();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios e análise</CardTitle>
          <p className="text-sm text-muted-foreground">
            Indicadores agregados com base em leads, oportunidades, contatos e interações.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {blocks.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <p className="text-xs text-muted-foreground">{b.label}</p>
                    <p className="text-xl font-bold mt-0.5">{b.value}</p>
                    {b.sub && (
                      <p className="text-xs text-muted-foreground mt-0.5">{b.sub}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium mb-3">Pipeline por estágio</p>
                  <ul className="space-y-2">
                    {byStage.map((r) => (
                      <li
                        key={r.stage}
                        className="flex justify-between text-sm text-muted-foreground"
                      >
                        <span>{r.label}</span>
                        <span>
                          {r.count} — {r.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium mb-3">Leads por fonte</p>
                  <ul className="space-y-2">
                    {bySource.length === 0 ? (
                      <li className="text-sm text-muted-foreground">Nenhum lead</li>
                    ) : (
                      bySource.map((r) => (
                        <li
                          key={r.source}
                          className="flex justify-between text-sm text-muted-foreground"
                        >
                          <span>{r.label}</span>
                          <span>{r.count}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
