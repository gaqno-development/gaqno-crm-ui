import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { EmptyState, LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { HomeIcon } from "@gaqno-development/frontcore/components/icons";
import { useCRMOrganization } from "./hooks/useCRMOrganization";

export default function OrganizationPage() {
  const { organization, isLoading } = useCRMOrganization();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Organização</CardTitle>
          <p className="text-sm text-muted-foreground">
            Dados da sua organização no CRM.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoaderPinwheelIcon size={32} className="text-primary" />
            </div>
          )}
          {!isLoading && !organization && (
            <EmptyState
              icon={HomeIcon}
              title="Nenhuma organização configurada"
              description="Configure os dados da organização para exibir aqui."
              size="sm"
            />
          )}
          {!isLoading && organization && (
            <div className="rounded-lg border border-border p-4 space-y-2">
              <p className="font-medium">{organization.name}</p>
              {organization.slug && <p className="text-sm text-muted-foreground">{organization.slug}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
