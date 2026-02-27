import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { useSalesReportsPage } from "./hooks/useSalesReportsPage";

export default function SalesReportsPage() {
  const { reportRows, wonCount, lostCount, isLoading } = useSalesReportsPage();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios de vendas</CardTitle>
          <p className="text-sm text-muted-foreground">
            Métricas de pipeline, ganhas e perdidas e leads.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportRows.map((r) => (
                <div
                  key={r.label}
                  className="rounded-xl border border-border bg-card px-4 py-3"
                >
                  <p className="text-xs text-muted-foreground">{r.label}</p>
                  <p className="text-xl font-bold mt-0.5">{r.value}</p>
                </div>
              ))}
              <div className="rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-xs text-muted-foreground">Deals ganhos (total)</p>
                <p className="text-xl font-bold mt-0.5 text-green-600">{wonCount}</p>
              </div>
              <div className="rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-xs text-muted-foreground">Deals perdidos (total)</p>
                <p className="text-xl font-bold mt-0.5 text-red-600">{lostCount}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
