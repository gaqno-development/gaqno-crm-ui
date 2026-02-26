import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@gaqno-development/frontcore/components/ui";
import { Plus, Loader2 } from "lucide-react";
import type { LeadSource } from "../../../types/crm";

interface AddLeadDialogProps {
  onSuccess: (newLead: { name: string; company: string; email: string; source: LeadSource }) => Promise<void>;
  isCreating: boolean;
  sourceOptions: { label: string; value: string }[];
}

export function AddLeadDialog({ onSuccess, isCreating, sourceOptions }: AddLeadDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    email: "",
    source: "website" as LeadSource,
  });

  const handleCreateLead = async () => {
    if (!newLead.name) return;
    try {
      await onSuccess(newLead);
      setIsDialogOpen(false);
      setNewLead({ name: "", company: "", email: "", source: "website" });
    } catch (err) {
      console.error("Failed to create lead", err);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-1.5">
          <Plus className="h-4 w-4" />
          Novo Lead
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Lead</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Nome Completo</label>
            <Input
              placeholder="Ex: Maria Santos"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Empresa</label>
            <Input
              placeholder="Ex: Acme Corp"
              value={newLead.company}
              onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="maria@acme.com"
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Fonte</label>
            <Select
              value={newLead.source}
              onValueChange={(v) => setNewLead({ ...newLead, source: v as LeadSource })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a fonte" />
              </SelectTrigger>
              <SelectContent>
                {sourceOptions.slice(1).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full"
            onClick={handleCreateLead}
            disabled={isCreating || !newLead.name}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando...
              </>
            ) : (
              "Criar Lead"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
