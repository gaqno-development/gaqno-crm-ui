import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DealsStageColumn } from "./DealsStageColumn";
import type { Deal } from "../../../../types/crm";

vi.mock("@dnd-kit/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@dnd-kit/core")>();
  return {
    ...actual,
    useDroppable: () => ({ setNodeRef: vi.fn(), isOver: false }),
    useDraggable: () => ({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      isDragging: false,
    }),
  };
});

const mockDeal: Deal = {
  id: "d1",
  name: "Deal One",
  contactId: "c1",
  contactName: "Contact",
  company: "Company",
  value: 5000,
  currency: "BRL",
  stage: "proposal",
  probability: 50,
  closingDate: "2026-03-15T00:00:00Z",
  ownerId: "u1",
  ownerName: "Owner",
  createdAt: "2026-02-01T00:00:00Z",
  updatedAt: "2026-02-15T00:00:00Z",
};

describe("DealsStageColumn", () => {
  it("renders stage column with label and deal count", () => {
    render(
      <DealsStageColumn
        stage="proposal"
        label="Proposal"
        color="border-muted"
        headerColor="bg-muted"
        deals={[mockDeal]}
      />
    );
    expect(screen.getByTestId("deals-stage-proposal")).toBeInTheDocument();
    expect(screen.getByText("Proposal")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders empty state when no deals", () => {
    render(
      <DealsStageColumn
        stage="qualification"
        label="Qualification"
        color="border-muted"
        headerColor="bg-muted"
        deals={[]}
      />
    );
    expect(screen.getByTestId("deals-stage-empty")).toBeInTheDocument();
  });

  it("renders deal cards when deals provided", () => {
    render(
      <DealsStageColumn
        stage="proposal"
        label="Proposal"
        color="border-muted"
        headerColor="bg-muted"
        deals={[mockDeal]}
      />
    );
    expect(screen.getByTestId("deal-card")).toBeInTheDocument();
    expect(screen.getByTestId("deal-name")).toHaveTextContent("Deal One");
  });
});
