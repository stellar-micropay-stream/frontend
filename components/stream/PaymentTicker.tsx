"use client";
import { useStream } from "@/hooks/useStream";

const HORIZON = process.env.NEXT_PUBLIC_HORIZON_URL ?? "https://horizon-testnet.stellar.org";

export function PaymentTicker() {
  const { payments } = useStream();

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-2">
      <h3 className="text-sm font-semibold text-gray-300">Live Payments</h3>

      {payments.length === 0 ? (
        <p className="text-xs text-gray-500">No payments yet…</p>
      ) : (
        <ul className="space-y-1 max-h-64 overflow-y-auto">
          {payments.map((p, i) => (
            <li
              key={`${p.sessionId}-${p.timestamp}-${i}`}
              className="flex items-center justify-between text-xs text-gray-400"
            >
              <span className="font-mono">
                {new Date(p.timestamp * 1000).toLocaleTimeString()}
              </span>
              <span className="text-green-400 font-mono">+{p.amount} XLM</span>
              <span className="font-mono text-gray-500">
                {p.receiver.slice(0, 6)}…
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
