import {
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Users,
} from "lucide-react";
import type { InteractionType } from "../../../types/crm";

export const INTERACTION_TYPE_CONFIG: Record<
  InteractionType,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    dotColor: string;
    bgColor: string;
    textColor: string;
  }
> = {
  whatsapp: {
    label: "WhatsApp",
    icon: MessageCircle,
    dotColor: "bg-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-400",
  },
  email: {
    label: "Email",
    icon: Mail,
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-400",
  },
  phone: {
    label: "Telefone",
    icon: Phone,
    dotColor: "bg-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-700 dark:text-purple-400",
  },
  note: {
    label: "Nota",
    icon: FileText,
    dotColor: "bg-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-700 dark:text-orange-400",
  },
  meeting: {
    label: "Reunião",
    icon: Users,
    dotColor: "bg-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    textColor: "text-teal-700 dark:text-teal-400",
  },
};
