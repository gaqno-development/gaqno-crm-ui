import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Users } from "lucide-react";
import { EmptyState } from "./EmptyState";

describe("CRM EmptyState", () => {
  it("should render title", () => {
    render(<EmptyState title="No leads found" />);
    expect(screen.getByText("No leads found")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    render(
      <EmptyState 
        title="No leads found" 
        description="Try adjusting your search criteria" 
      />
    );
    expect(screen.getByText("Try adjusting your search criteria")).toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(<EmptyState title="No leads" icon={Users} />);
    const icon = screen.getByRole("presentation");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("lucide", "lucide-users");
  });

  it("should render action button when provided", () => {
    const mockAction = vi.fn();
    render(
      <EmptyState 
        title="No leads" 
        action={{ label: "Add Lead", onClick: mockAction }} 
      />
    );
    
    const button = screen.getByText("Add Lead");
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it("should apply custom className", () => {
    const { container } = render(
      <EmptyState title="No leads" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should use compact variant", () => {
    render(<EmptyState title="Test" variant="compact" />);
    const container = screen.getByText("Test").closest("div");
    expect(container).toHaveClass("py-6", "text-center");
  });

  it("should use centered variant", () => {
    render(<EmptyState title="Test" variant="centered" />);
    const container = screen.getByText("Test").closest("div");
    expect(container).toHaveClass("py-16", "text-center");
  });
});
