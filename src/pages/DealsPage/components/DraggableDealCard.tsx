import { useDraggable } from "@dnd-kit/core";
import type { Deal } from "../../../../types/crm";
import { DealCard } from "./DealCard";

export interface DraggableDealCardProps {
  deal: Deal;
  onMarkWon?: (dealId: string) => void;
  onMarkLost?: (dealId: string) => void;
}

export function DraggableDealCard({
  deal,
  onMarkWon,
  onMarkLost,
}: DraggableDealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id: deal.id,
    data: { deal },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={isDragging ? "opacity-50" : undefined}
    >
      <DealCard
        deal={deal}
        onMarkWon={onMarkWon}
        onMarkLost={onMarkLost}
      />
    </div>
  );
}
