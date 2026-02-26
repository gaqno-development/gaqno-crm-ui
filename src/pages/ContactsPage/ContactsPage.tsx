import { Input } from "@gaqno-development/frontcore/components";
import { MagnifierIcon } from "@gaqno-development/frontcore/components/icons";
import { LoaderPinwheelIcon } from "@gaqno-development/frontcore/components/ui";
import { useContactsPage } from "./hooks/useContactsPage";
import { ContactList } from "./components/ContactList";
import { ContactDetailSheet } from "./components/ContactDetailSheet";

export default function ContactsPage() {
  const {
    contacts,
    isLoadingContacts,
    search,
    setSearch,
    selectedContact,
    setSelectedContact,
    interactions,
    isLoadingInteractions,
  } = useContactsPage();

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <MagnifierIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" size={16} />
        <Input
          placeholder="Buscar contatos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      {isLoadingContacts && (
        <div className="flex items-center justify-center py-12">
          <LoaderPinwheelIcon size={32} className="text-primary" />
        </div>
      )}

      {!isLoadingContacts && (
        <ContactList contacts={contacts} onSelectContact={setSelectedContact} />
      )}

      <ContactDetailSheet
        contact={selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
        interactions={interactions}
        isLoadingInteractions={isLoadingInteractions}
      />
    </div>
  );
}
