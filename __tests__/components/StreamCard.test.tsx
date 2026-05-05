import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StreamCard } from "@/components/stream/StreamCard";
import type { StreamSession } from "@/lib/types";

const session: StreamSession = {
  sessionId: "s1",
  sender: "GABC123",
  receiver: "GXYZ456789012",
  ratePerSec: "0.0000100",
  mode: "onchain",
  startedAt: Date.now() - 10000,
  lastPaymentAt: Date.now(),
  status: "active",
};

describe("StreamCard", () => {
  it("renders session info", () => {
    render(<StreamCard session={session} />);
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(screen.getByText(/onchain/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.0000100 XLM\/s/)).toBeInTheDocument();
  });

  it("shows stop button for active sessions", async () => {
    const onStop = jest.fn();
    render(<StreamCard session={session} onStop={onStop} />);
    await userEvent.click(screen.getByText(/stop stream/i));
    expect(onStop).toHaveBeenCalledWith("s1");
  });

  it("hides stop button for closed sessions", () => {
    render(<StreamCard session={{ ...session, status: "closed" }} onStop={jest.fn()} />);
    expect(screen.queryByText(/stop stream/i)).not.toBeInTheDocument();
  });
});
