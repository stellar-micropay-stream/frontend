import { useStreamStore } from "@/store/streamStore";
import type { StreamSession, PaymentEvent } from "@/lib/types";

const mockSession: StreamSession = {
  sessionId: "s1",
  sender: "GABC",
  receiver: "GXYZ",
  ratePerSec: "0.0000100",
  mode: "onchain",
  startedAt: 1000,
  lastPaymentAt: 1000,
  status: "active",
};

const mockPayment: PaymentEvent = {
  type: "payment",
  sessionId: "s1",
  sender: "GABC",
  receiver: "GXYZ",
  amount: "0.0000200",
  timestamp: 1746451063,
};

beforeEach(() => {
  useStreamStore.setState({
    publicKey: null,
    token: null,
    activeSessions: [],
    openChannels: [],
    recentPayments: [],
  });
});

describe("streamStore", () => {
  it("sets publicKey", () => {
    useStreamStore.getState().setPublicKey("GABC");
    expect(useStreamStore.getState().publicKey).toBe("GABC");
  });

  it("adds and removes a session", () => {
    useStreamStore.getState().addSession(mockSession);
    expect(useStreamStore.getState().activeSessions).toHaveLength(1);

    useStreamStore.getState().removeSession("s1");
    expect(useStreamStore.getState().activeSessions).toHaveLength(0);
  });

  it("updates a session", () => {
    useStreamStore.getState().addSession(mockSession);
    useStreamStore.getState().updateSession("s1", { status: "closed" });
    expect(useStreamStore.getState().activeSessions[0].status).toBe("closed");
  });

  it("appends payments and caps at 50", () => {
    for (let i = 0; i < 55; i++) {
      useStreamStore.getState().appendPayment({ ...mockPayment, timestamp: i });
    }
    expect(useStreamStore.getState().recentPayments).toHaveLength(50);
  });

  it("clears payments", () => {
    useStreamStore.getState().appendPayment(mockPayment);
    useStreamStore.getState().clearPayments();
    expect(useStreamStore.getState().recentPayments).toHaveLength(0);
  });

  it("prepends newest payment first", () => {
    useStreamStore.getState().appendPayment({ ...mockPayment, timestamp: 1 });
    useStreamStore.getState().appendPayment({ ...mockPayment, timestamp: 2 });
    expect(useStreamStore.getState().recentPayments[0].timestamp).toBe(2);
  });
});
