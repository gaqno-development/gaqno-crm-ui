import { Avatar, AvatarFallback } from "@gaqno-development/frontcore/components/ui";
import { formatDateTime, getInitials } from "@gaqno-development/frontcore/utils";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import { Mail, Phone, MessageCircle, Building2 } from "lucide-react";
import type { Contact, ContactTag } from "@gaqno-development/types/crm";

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

export interface ContactListItemProps {
  contact: Contact;
  onSelect: () => void;
}

export function ContactListItem({ contact, onSelect }: ContactListItemProps) {
  const ChannelIcon = CHANNEL_ICON[contact.lastChannel]?.icon ?? MessageCircle;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 text-left hover:bg-muted/40 hover:border-primary/30 transition-all group"
    >
      <Avatar className="h-9 w-9 rounded-full shrink-0 bg-gradient-to-br from-primary/80 to-primary">
        <AvatarFallback className="bg-transparent text-primary-foreground text-xs font-bold">
          {getInitials(contact.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{contact.name}</span>
          {contact.tags?.map((tag: ContactTag) => (
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
            <span>{formatDateTime(contact.lastInteractionAt)}</span>
          </div>
        )}
      </div>
    </button>
  );
}
