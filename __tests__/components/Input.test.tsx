import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Receiver" />);
    expect(screen.getByText("Receiver")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Input error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(<Input placeholder="G..." />);
    expect(screen.getByPlaceholderText("G...")).toBeInTheDocument();
  });
});
