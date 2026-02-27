import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { EmptyState, LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { DollarSignIcon } from "@gaqno-development/frontcore/components/icons";
import { useFinancialReportsPage } from "./hooks/useFinancialReportsPage";

export default function FinancialReportsPage() {
  const { summaries, isLoading } = useFinancialReportsPage();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios financeiros</CardTitle>
          <p className="text-sm text-muted-foreground">
            Resumos de faturamento, pagamentos e receita.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && summaries.length === 0 && (
            <EmptyState
              icon={DollarSignIcon}
              title="Nenhum relatório financeiro"
              description="Quando houver dados financeiros, os resumos aparecerão aqui."
              size="sm"
            />
          )}
          {!isLoading && summaries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {summaries.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-border bg-card px-4 py-3"
                >
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
