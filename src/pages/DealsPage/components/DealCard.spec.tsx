import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { DealCard } from "./DealCard";
import type { Deal } from "../../../../types/crm";

const negotiationDeal: Deal = {
  id: "d2",
  name: "Test Deal",
  contactId: "c2",
  contactName: "Contact",
  company: "Company Ltda",
  value: 12000,
  currency: "BRL",
  stage: "negotiation",
  probability: 85,
  closingDate: "2026-03-15T00:00:00Z",
  ownerId: "u1",
  ownerName: "Owner",
  createdAt: "2026-02-12T00:00:00Z",
  updatedAt: "2026-02-25T00:00:00Z",
};

const proposalDeal: Deal = {
  ...negotiationDeal,
  id: "d1",
  stage: "proposal",
};

describe("DealCard", () => {
  it("renders deal name and company", () => {
    render(<DealCard deal={negotiationDeal} />);
    expect(screen.getByTestId("deal-card")).toBeInTheDocument();
    expect(screen.getByTestId("deal-name")).toHaveTextContent("Test Deal");
    expect(screen.getByTestId("deal-company")).toHaveTextContent("Company Ltda");
  });

  it("when stage is negotiation and onMarkWon provided, shows Won button that calls onMarkWon with deal id", () => {
    const onMarkWon = vi.fn();
    render(
      <DealCard deal={negotiationDeal} onMarkWon={onMarkWon} onMarkLost={vi.fn()} />
    );
    const wonButton = screen.getByTestId("deal-won-btn");
    fireEvent.click(wonButton);
    expect(onMarkWon).toHaveBeenCalledWith("d2");
  });

  it("when stage is negotiation and onMarkLost provided, shows Lost button that calls onMarkLost with deal id", () => {
    const onMarkLost = vi.fn();
    render(
      <DealCard deal={negotiationDeal} onMarkWon={vi.fn()} onMarkLost={onMarkLost} />
    );
    const lostButton = screen.getByTestId("deal-lost-btn");
    fireEvent.click(lostButton);
    expect(onMarkLost).toHaveBeenCalledWith("d2");
  });

  it("when stage is not negotiation, does not show Won or Lost buttons", () => {
    render(
      <DealCard
        deal={proposalDeal}
        onMarkWon={vi.fn()}
        onMarkLost={vi.fn()}
      />
    );
    expect(screen.queryByTestId("deal-won-btn")).not.toBeInTheDocument();
    expect(screen.queryByTestId("deal-lost-btn")).not.toBeInTheDocument();
  });
});
