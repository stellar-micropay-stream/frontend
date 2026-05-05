import { startSession, stopSession, createPaymentStream } from "@/lib/api";

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("api client", () => {
  it("startSession posts to /sessions", async () => {
    const session = { sessionId: "s1", sender: "G1", receiver: "G2", ratePerSec: "0.0000100", mode: "onchain", startedAt: 0, lastPaymentAt: 0, status: "active" };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => session });

    const result = await startSession({ receiver: "G2", ratePerSec: "0.0000100", mode: "onchain" }, "token123");
    expect(result.sessionId).toBe("s1");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/sessions"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("stopSession sends DELETE", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });
    const result = await stopSession("s1", "token123");
    expect(result.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/sessions/s1"),
      expect.objectContaining({ method: "DELETE" })
    );
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
      json: async () => ({ error: "Invalid token" }),
    });
    await expect(startSession({ receiver: "G2", ratePerSec: "0.0000100", mode: "onchain" }, "bad")).rejects.toThrow("Invalid token");
  });
});

describe("createPaymentStream", () => {
  it("creates an EventSource with the wallet query param", () => {
    const mockEs = { onmessage: null, close: jest.fn() };
    global.EventSource = jest.fn(() => mockEs) as unknown as typeof EventSource;

    const es = createPaymentStream("GABC", jest.fn());
    expect(global.EventSource).toHaveBeenCalledWith(
      expect.stringContaining("wallet=GABC")
    );
    es.close();
  });
});
