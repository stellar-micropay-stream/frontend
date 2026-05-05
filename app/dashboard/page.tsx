"use client";
import { ConnectButton } from "@/components/wallet/ConnectButton";
import { WalletStatus } from "@/components/wallet/WalletStatus";
import { StreamControls } from "@/components/stream/StreamControls";
import { StreamCard } from "@/components/stream/StreamCard";
import { PaymentTicker } from "@/components/stream/PaymentTicker";
import { useStream } from "@/hooks/useStream";
import { useWallet } from "@/hooks/useWallet";

export default function DashboardPage() {
  const { isConnected } = useWallet();
  const { activeSessions, stopStream } = useStream();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-400">Connect your wallet to access the dashboard.</p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <WalletStatus />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreamControls />
        <PaymentTicker />
      </div>

      {activeSessions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-200 mb-3">
            Active Streams ({activeSessions.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSessions.map((s) => (
              <StreamCard
                key={s.sessionId}
                session={s}
                onStop={stopStream}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
