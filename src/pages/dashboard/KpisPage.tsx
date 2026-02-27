import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import { useKpisPage } from "./hooks/useKpisPage";

export default function KpisPage() {
  const { kpiCards, isLoading } = useKpisPage();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>KPIs</CardTitle>
          <p className="text-sm text-muted-foreground">
            Indicadores de desempenho com base em leads, oportunidades, contatos e interações.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {kpiCards.map(({ label, value, sub, icon: Icon, color, bg }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card px-4 py-3 flex flex-col gap-3"
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", bg)}>
                    <Icon className={cn("h-5 w-5", color)} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xl font-bold mt-0.5">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
