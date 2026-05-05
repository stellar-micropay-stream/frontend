"use client";
import { useWallet } from "@/hooks/useWallet";

export function WalletStatus() {
  const { publicKey, isConnected } = useWallet();

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gray-500" />
        <span className="text-sm text-gray-500">Not connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-green-400" />
      <span className="text-sm text-gray-300 font-mono">
        {publicKey!.slice(0, 8)}…{publicKey!.slice(-6)}
      </span>
    </div>
  );
}
