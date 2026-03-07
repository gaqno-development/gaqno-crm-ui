import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { OverviewKpiCards } from "./OverviewKpiCards";
import type { CRMStatCard } from "../../../hooks/useCRMStats";

vi.mock("@gaqno-development/frontcore/components/ui", () => {
  const React = require("react");
  return {
    StatCard: ({
      title,
      value,
      description,
    }: {
      title: string;
      value: string | number;
      description?: string;
    }) =>
      React.createElement(
        "div",
        { "data-testid": "stat-card" },
        React.createElement("span", { "data-testid": "stat-title" }, title),
        React.createElement("span", { "data-testid": "stat-value" }, String(value)),
        description != null &&
          React.createElement("span", { "data-testid": "stat-desc" }, description)
      ),
  };
});

const mockCards: CRMStatCard[] = [
  { title: "Leads", value: 42, description: "total" },
  { title: "Pipeline", value: "R$ 10.000", description: "ativo" },
];

describe("OverviewKpiCards", () => {
  it("renders cards container", () => {
    render(<OverviewKpiCards cards={mockCards} />);
    expect(screen.getByTestId("overview-kpi-cards")).toBeInTheDocument();
  });

  it("renders all cards with title and value", () => {
    render(<OverviewKpiCards cards={mockCards} />);
    const titles = screen.getAllByTestId("stat-title");
    const values = screen.getAllByTestId("stat-value");
    expect(titles.map((t) => t.textContent)).toContain("Leads");
    expect(titles.map((t) => t.textContent)).toContain("Pipeline");
    expect(values.map((v) => v.textContent)).toContain("42");
    expect(values.map((v) => v.textContent)).toContain("R$ 10.000");
  });

  it("shows loading placeholder when isLoading", () => {
    render(<OverviewKpiCards cards={mockCards} isLoading />);
    expect(screen.getByTestId("overview-kpi-cards")).toBeInTheDocument();
    expect(screen.getAllByText("…").length).toBeGreaterThan(0);
  });
});
