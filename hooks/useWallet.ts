"use client";
import { useCallback, useEffect, useState } from "react";
import { connectWallet, getWalletPublicKey, signTx } from "@/lib/freighter";
import { useStreamStore } from "@/store/streamStore";

export function useWallet() {
  const { publicKey, setPublicKey } = useStreamStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore connection on mount
  useEffect(() => {
    getWalletPublicKey().then((key) => {
      if (key) setPublicKey(key);
    });
  }, [setPublicKey]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const key = await connectWallet();
      setPublicKey(key);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect");
    } finally {
      setIsConnecting(false);
    }
  }, [setPublicKey]);

  const disconnect = useCallback(() => {
    setPublicKey(null);
  }, [setPublicKey]);

  const signTransaction = useCallback(
    async (xdr: string) => signTx(xdr),
    []
  );

  return {
    publicKey,
    isConnected: !!publicKey,
    isConnecting,
    error,
    connect,
    disconnect,
    signTransaction,
  };
}
