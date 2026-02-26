import { Input } from "@gaqno-development/frontcore/components/ui";
import { EmptyState } from "@gaqno-development/frontcore/components/ui";
import { UsersIcon } from "@gaqno-development/frontcore/components/icons";
import { Search, Loader2 } from "lucide-react";
import { useInteractionHistoryPage } from "./hooks/useInteractionHistoryPage";
import { InteractionHistoryItem } from "./components/InteractionHistoryItem";

export default function InteractionHistoryPage() {
  const { interactions, isLoading, search, setSearch } = useInteractionHistoryPage();

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar por contato ou resumo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-5 pl-11">
            {interactions.length === 0 && (
              <EmptyState
                icon={UsersIcon}
                title="Nenhuma interação encontrada"
                description="Ajuste o filtro de busca ou aguarde novas interações com contatos."
                size="sm"
              />
            )}
            {interactions.map((interaction) => (
              <InteractionHistoryItem key={interaction.id} interaction={interaction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
