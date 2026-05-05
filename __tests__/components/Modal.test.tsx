import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@/components/ui/Modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(<Modal open={false} onClose={jest.fn()} title="Test"><p>Content</p></Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title and children when open", () => {
    render(<Modal open onClose={jest.fn()} title="My Modal"><p>Hello</p></Modal>);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("My Modal")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = jest.fn();
    render(<Modal open onClose={onClose} title="Test"><p>Content</p></Modal>);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop clicked", async () => {
    const onClose = jest.fn();
    render(<Modal open onClose={onClose} title="Test"><p>Content</p></Modal>);
    await userEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
