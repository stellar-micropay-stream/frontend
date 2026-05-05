import type { StreamSession, ChannelState, PaymentEvent } from "./types";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

// Sessions
export const startSession = (
  body: { receiver: string; ratePerSec: string; mode: "onchain" | "channel" },
  token: string
) =>
  request<StreamSession>("/sessions", {
    method: "POST",
    body: JSON.stringify(body),
  }, token);

export const getSession = (id: string, token: string) =>
  request<StreamSession>(`/sessions/${id}`, {}, token);

export const stopSession = (id: string, token: string) =>
  request<{ success: boolean }>(`/sessions/${id}`, { method: "DELETE" }, token);

// Channels
export const openChannel = (
  body: { receiver: string; depositAmount: string; contractId: string },
  token: string
) =>
  request<ChannelState>("/channels/open", {
    method: "POST",
    body: JSON.stringify(body),
  }, token);

export const updateChannel = (
  body: { channelId: string; amount: string; senderSig: string },
  token: string
) =>
  request<ChannelState>("/channels/update", {
    method: "POST",
    body: JSON.stringify(body),
  }, token);

export const closeChannel = (channelId: string, token: string) =>
  request<ChannelState>("/channels/close", {
    method: "POST",
    body: JSON.stringify({ channelId }),
  }, token);

export const getChannel = (id: string, token: string) =>
  request<ChannelState>(`/channels/${id}`, {}, token);

// SSE helper
export function createPaymentStream(
  publicKey: string,
  onEvent: (e: PaymentEvent) => void
): EventSource {
  const es = new EventSource(`${BASE}/payments/stream?wallet=${publicKey}`);
  es.onmessage = (e) => {
    try {
      onEvent(JSON.parse(e.data) as PaymentEvent);
    } catch {
      // ignore malformed events
    }
  };
  return es;
}
