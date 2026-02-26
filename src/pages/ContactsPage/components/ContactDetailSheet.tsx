import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  ChatTrigger,
} from "@gaqno-development/frontcore/components";
import { Avatar, AvatarFallback } from "@gaqno-development/frontcore/components/ui";
import { formatDateTime, getInitials } from "@gaqno-development/frontcore/utils";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import { Mail, Phone, Tag, Loader2 } from "lucide-react";
import type { Contact, ContactTag, InteractionType } from "@gaqno-development/types/crm";
import type { Interaction } from "@gaqno-development/types/crm";

const TAG_CONFIG: Record<ContactTag, { label: string; className: string }> = {
  vip: { label: "VIP", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" },
  partner: { label: "Partner", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  churned: { label: "Churned", className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  prospect: { label: "Prospect", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-blue-300" },
  customer: { label: "Customer", className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
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

export interface ContactDetailSheetProps {
  contact: Contact | null;
  onOpenChange: (open: boolean) => void;
  interactions: Interaction[];
  isLoadingInteractions: boolean;
}

export function ContactDetailSheet({
  contact,
  onOpenChange,
  interactions,
  isLoadingInteractions,
}: ContactDetailSheetProps) {
  return (
    <Sheet open={!!contact} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        {contact && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 rounded-full shrink-0 bg-gradient-to-br from-primary/80 to-primary">
                    <AvatarFallback className="bg-transparent text-primary-foreground text-xs font-bold">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-semibold">{contact.name}</p>
                    <p className="text-sm text-muted-foreground font-normal">
                      {contact.jobTitle} {contact.company ? `· ${contact.company}` : ""}
                    </p>
                  </div>
                </div>
                <ChatTrigger customerId={contact.id} className="h-8 px-3">
                  Conversar
                </ChatTrigger>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto space-y-5 mt-4">
              <div className="rounded-lg border border-border divide-y divide-border">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {contact.phone}
                  </a>
                )}
                <div className="flex items-center gap-3 px-4 py-2.5 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-1.5 flex-wrap">
                    {contact.tags?.map((tag: ContactTag) => (
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
                                · {formatDateTime(interaction.createdAt)}
                              </span>
                            </div>
                            <p className="text-xs text-foreground/80 mt-0.5">
                              {interaction.summary || interaction.body}
                            </p>
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
  );
}
