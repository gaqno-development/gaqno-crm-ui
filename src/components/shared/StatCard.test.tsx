import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Users, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";

// Mock @testing-library/jest-dom matchers
vi.mock("@testing-library/jest-dom", async () => {
  const original = await vi.importActual("@testing-library/jest-dom");
  return {
    ...original,
    matchers: {
      ...original.matchers,
      toBeInTheDocument: vi.fn(),
      toHaveClass: vi.fn(),
    },
  };
});

// Import the mocked matchers
import "@testing-library/jest-dom";

describe("CRM StatCard", () => {
  it("should render title and value", () => {
    render(<StatCard title="Total Leads" value="150" />);

    expect(screen.getByText("Total Leads")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(<StatCard title="Test" value="100" icon={Users} />);

    const icon = screen.getByRole("presentation");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("lucide", "lucide-users");
  });

  it("should render description when provided", () => {
    render(
      <StatCard title="Test" value="100" description="Test description" />,
    );

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should render trend when provided", () => {
    render(
      <StatCard
        title="Test"
        value="100"
        trend={{ value: "+10%", isPositive: true }}
      />,
    );

    expect(screen.getByText("+10%")).toBeInTheDocument();
  });

  it("should show loading state when isLoading is true", () => {
    render(<StatCard title="Test" value="100" isLoading={true} />);

    expect(screen.getByText("…")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <StatCard title="Test" value="100" className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should render positive trend in green", () => {
    render(
      <StatCard
        title="Test"
        value="100"
        trend={{ value: "+10%", isPositive: true }}
      />,
    );

    const trendElement = screen.getByText("+10%");
    expect(trendElement).toHaveClass("text-green-600");
  });

  it("should render negative trend in red", () => {
    render(
      <StatCard
        title="Test"
        value="100"
        trend={{ value: "-10%", isPositive: false }}
      />,
    );

    const trendElement = screen.getByText("-10%");
    expect(trendElement).toHaveClass("text-red-600");
  });

  it("should use compact variant", () => {
    render(<StatCard title="Test" value="100" variant="compact" />);

    const title = screen.getByText("Test");
    expect(title.parentElement).toHaveClass("p-4");
  });

  it("should use metric variant", () => {
    render(<StatCard title="Test" value="100" variant="metric" />);

    const value = screen.getByText("100");
    expect(value.parentElement).toHaveClass("text-3xl", "font-bold");
  });
});
