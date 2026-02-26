import type { Contact } from "@gaqno-development/types/crm";
import { EmptyState } from "@gaqno-development/frontcore/components/ui";
import { UsersIcon } from "@gaqno-development/frontcore/components/icons";
import { ContactListItem } from "./ContactListItem";

export interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export function ContactList({ contacts, onSelectContact }: ContactListProps) {
  return (
    <div className="grid gap-2">
      {contacts.map((contact) => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onSelect={() => onSelectContact(contact)}
        />
      ))}
      {contacts.length === 0 && (
        <EmptyState
          icon={UsersIcon}
          title="Nenhum contato encontrado"
          description="Adicione contatos ou ajuste os filtros de busca."
          size="sm"
        />
      )}
    </div>
  );
}
