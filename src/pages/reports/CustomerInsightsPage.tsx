import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { EmptyState, LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { UsersIcon } from "@gaqno-development/frontcore/components/icons";
import { useCustomerInsightsPage } from "./hooks/useCustomerInsightsPage";

export default function CustomerInsightsPage() {
  const { totalContacts, totalInteractions, byTag, byType, isLoading } =
    useCustomerInsightsPage();

  const hasData = totalContacts > 0 || totalInteractions > 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Insights de clientes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Contatos por tag e interações por tipo.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && !hasData && (
            <EmptyState
              icon={UsersIcon}
              title="Nenhum dado disponível"
              description="Cadastre contatos e interações para ver os insights aqui."
              size="sm"
            />
          )}
          {!isLoading && hasData && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground">Total de contatos</p>
                  <p className="text-xl font-bold mt-0.5">{totalContacts}</p>
                </div>
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground">Total de interações</p>
                  <p className="text-xl font-bold mt-0.5">{totalInteractions}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium mb-3">Contatos por tag</p>
                  <ul className="space-y-2">
                    {byTag.length === 0 ? (
                      <li className="text-sm text-muted-foreground">Nenhuma tag</li>
                    ) : (
                      byTag.map((r) => (
                        <li
                          key={r.tag}
                          className="flex justify-between text-sm text-muted-foreground"
                        >
                          <span>{r.label}</span>
                          <span>{r.count}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium mb-3">Interações por tipo</p>
                  <ul className="space-y-2">
                    {byType.length === 0 ? (
                      <li className="text-sm text-muted-foreground">Nenhuma interação</li>
                    ) : (
                      byType.map((r) => (
                        <li
                          key={r.type}
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
