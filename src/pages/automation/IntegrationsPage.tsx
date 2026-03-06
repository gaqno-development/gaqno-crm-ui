import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gaqno-development/frontcore/components";
import { Button } from "@gaqno-development/frontcore/components/ui";
import { Link2, RefreshCw, Unlink, Loader2 } from "lucide-react";
import { useCRMIntegrations } from "./hooks/useCRMIntegrations";
import type { Integration } from "./types";

const PROVIDER_ICONS: Record<string, string> = {
  pipedrive: "🟢",
  salesforce: "☁️",
};

function IntegrationCard({
  integration,
  onConnect,
  onSync,
  onDisconnect,
  isSyncing,
  isConnecting,
}: {
  integration: Integration;
  onConnect: (p: string) => void;
  onSync: (p: string) => void;
  onDisconnect: (p: string) => void;
  isSyncing: boolean;
  isConnecting: boolean;
}) {
  const icon = PROVIDER_ICONS[integration.provider] ?? "🔗";

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="font-medium text-sm">{integration.name}</p>
            <p className="text-xs text-muted-foreground">
              {integration.connected ? (
                <>
                  <span className="text-green-600 font-medium">Conectado</span>
                  {integration.lastSyncAt && (
                    <span className="ml-2">
                      · Última sync:{" "}
                      {new Date(integration.lastSyncAt).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </>
              ) : (
                "Desconectado"
              )}
            </p>
            {integration.lastSyncError && (
              <p className="text-xs text-red-500 mt-1">
                Erro: {integration.lastSyncError}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {integration.connected ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSync(integration.provider)}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-1" />
                )}
                Sincronizar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDisconnect(integration.provider)}
                className="text-red-500 hover:text-red-600"
              >
                <Unlink className="h-4 w-4 mr-1" />
                Desconectar
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => onConnect(integration.provider)}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <Link2 className="h-4 w-4 mr-1" />
              )}
              Conectar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function IntegrationsPage() {
  const {
    integrations,
    isLoading,
    connect,
    sync,
    disconnect,
    isSyncing,
    isConnecting,
  } = useCRMIntegrations();

  const [searchParams, setSearchParams] = useSearchParams();
  const connectedProvider = searchParams.get("connected");

  useEffect(() => {
    if (connectedProvider) {
      const timer = setTimeout(() => {
        setSearchParams({}, { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [connectedProvider, setSearchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <p className="text-sm text-muted-foreground">
            Conecte Pipedrive ou Salesforce para sincronizar dados no CRM.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {connectedProvider && (
            <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-800">
              {connectedProvider.charAt(0).toUpperCase() +
                connectedProvider.slice(1)}{" "}
              conectado com sucesso.
            </div>
          )}
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConnect={connect}
              onSync={sync}
              onDisconnect={disconnect}
              isSyncing={isSyncing}
              isConnecting={isConnecting}
            />
          ))}
          {integrations.length === 0 && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Nenhuma integração disponível.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
