"use client";
import { useCallback, useEffect, useRef } from "react";
import { startSession, stopSession, createPaymentStream } from "@/lib/api";
import { useStreamStore } from "@/store/streamStore";

export function useStream() {
  const { publicKey, token, activeSessions, recentPayments, addSession, removeSession, appendPayment } =
    useStreamStore();
  const esRef = useRef<EventSource | null>(null);

  // Open SSE connection when wallet is connected
  useEffect(() => {
    if (!publicKey) return;
    const es = createPaymentStream(publicKey, appendPayment);
    esRef.current = es;
    return () => {
      es.close();
      esRef.current = null;
    };
  }, [publicKey, appendPayment]);

  const startStream = useCallback(
    async (params: { receiver: string; ratePerSec: string; mode: "onchain" | "channel" }) => {
      if (!token) throw new Error("Not authenticated");
      const session = await startSession(params, token);
      addSession(session);
      return session;
    },
    [token, addSession]
  );

  const stopStream = useCallback(
    async (sessionId: string) => {
      if (!token) throw new Error("Not authenticated");
      await stopSession(sessionId, token);
      removeSession(sessionId);
    },
    [token, removeSession]
  );

  return { startStream, stopStream, activeSessions, payments: recentPayments };
}
