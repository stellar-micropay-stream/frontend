"use client";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/Button";

export function ConnectButton() {
  const { publicKey, isConnected, isConnecting, error, connect, disconnect } =
    useWallet();

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400 font-mono">
          {publicKey.slice(0, 6)}…{publicKey.slice(-4)}
        </span>
        <Button variant="secondary" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <Button onClick={connect} loading={isConnecting}>
        Connect Wallet
      </Button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
