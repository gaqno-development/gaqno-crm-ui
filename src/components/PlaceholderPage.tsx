import React from "react";
import { EmptyState } from "@gaqno-development/frontcore/components/ui";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <EmptyState
      title={title}
      description={description ?? `${title} — content coming soon.`}
      size="md"
    />
  );
}
