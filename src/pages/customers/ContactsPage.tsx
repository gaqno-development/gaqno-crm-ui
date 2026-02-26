import { useState } from "react";
import {
  Badge,
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  ChatTrigger,
} from "@gaqno-development/frontcore/components";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import {
  Search,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Building2,
  Tag,
  Loader2,
} from "lucide-react";
import { useCRMContacts, useCRMInteractions } from "../../hooks/useCRMContacts";
import type { Contact, ContactTag, InteractionType } from "@gaqno-development/types/crm";

const TAG_CONFIG: Record<ContactTag, { label: string; className: string }> = {
  vip: { label: "VIP", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" },
  partner: { label: "Partner", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  churned: { label: "Churned", className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  prospect: { label: "Prospect", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-blue-300" },
  customer: { label: "Customer", className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
};

const CHANNEL_ICON: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  whatsapp: { icon: MessageCircle, label: "WhatsApp" },
  email: { icon: Mail, label: "Email" },
  phone: { icon: Phone, label: "Phone" },
  none: { icon: MessageCircle, label: "None" },
};

const INTERACTION_TYPE_CONFIG: Record<
  InteractionType,
  { label: string; color: string }
> = {
  whatsapp: { label: "WhatsApp", color: "text-green-600 dark:text-green-400" },
  email: { label: "Email", color: "text-blue-600 dark:text-blue-400" },
  phone: { label: "Phone", color: "text-purple-600 dark:text-purple-400" },
  note: { label: "Note", color: "text-orange-600 dark:text-orange-400" },
  meeting: { label: "Meeting", color: "text-teal-600 dark:text-teal-400" },
};

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  return (
    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
      {initials}
    </div>
  );
}

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  return `${days}d atrás`;
}

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { contacts, isLoading: isLoadingContacts } = useCRMContacts({ search });
  const { interactions, isLoading: isLoadingInteractions } = useCRMInteractions(selectedContact?.id);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar contatos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      {/* Loading Overlay for Contacts */}
      {isLoadingContacts && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Contact Grid */}
      {!isLoadingContacts && (
        <div className="grid gap-2">
          {contacts.map((contact) => {
            const ChannelIcon = CHANNEL_ICON[contact.lastChannel]?.icon ?? MessageCircle;
            return (
              <button
                type="button"
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 text-left hover:bg-muted/40 hover:border-primary/30 transition-all group"
              >
                <Avatar name={contact.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{contact.name}</span>
                    {contact.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                          TAG_CONFIG[tag as ContactTag].className
                        )}
                      >
                        {TAG_CONFIG[tag as ContactTag].label}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    {contact.company && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        {contact.company}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">{contact.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  {contact.lastInteractionAt && (
                    <div className={cn("flex items-center gap-1 text-xs", "text-muted-foreground")}>
                      <ChannelIcon className="h-3.5 w-3.5" />
                      <span>{formatRelativeTime(contact.lastInteractionAt)}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
          {contacts.length === 0 && (
            <p className="text-center py-12 text-muted-foreground text-sm">Nenhum contato encontrado.</p>
          )}
        </div>
      )}

      {/* Detail Sheet */}
      <Sheet open={!!selectedContact} onOpenChange={(o) => !o && setSelectedContact(null)}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          {selectedContact && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={selectedContact.name} />
                    <div>
                      <p className="text-base font-semibold">{selectedContact.name}</p>
                      <p className="text-sm text-muted-foreground font-normal">
                        {selectedContact.jobTitle} {selectedContact.company ? `· ${selectedContact.company}` : ""}
                      </p>
                    </div>
                  </div>
                  <ChatTrigger 
                    customerId={selectedContact.id} 
                    className="h-8 px-3"
                  >
                    Conversar
                  </ChatTrigger>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto space-y-5 mt-4">
                {/* Contact Info */}
                <div className="rounded-lg border border-border divide-y divide-border">
                  {selectedContact.email && (
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/40 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {selectedContact.email}
                    </a>
                  )}
                  {selectedContact.phone && (
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/40 transition-colors"
                    >
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {selectedContact.phone}
                    </a>
                  )}
                  <div className="flex items-center gap-3 px-4 py-2.5 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-1.5 flex-wrap">
                      {selectedContact.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                            TAG_CONFIG[tag as ContactTag].className
                          )}
                        >
                          {TAG_CONFIG[tag as ContactTag].label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interaction history */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Interações Recentes</h4>
                  {isLoadingInteractions ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  ) : interactions.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Nenhuma interação registrada.</p>
                  ) : (
                    <div className="space-y-2">
                      {interactions.map((interaction) => {
                        const typeConf = INTERACTION_TYPE_CONFIG[interaction.type as InteractionType];
                        return (
                          <div key={interaction.id} className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={cn("text-xs font-medium", typeConf.color)}>
                                  {typeConf.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  · {formatRelativeTime(interaction.createdAt)}
                                </span>
                              </div>
                              <p className="text-xs text-foreground/80 mt-0.5">{interaction.summary || interaction.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
