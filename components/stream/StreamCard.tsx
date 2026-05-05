"use client";
import type { StreamSession } from "@/lib/types";

interface StreamCardProps {
  session: StreamSession;
  onStop?: (id: string) => void;
}

const statusColor: Record<StreamSession["status"], string> = {
  active: "bg-green-400",
  paused: "bg-yellow-400",
  closed: "bg-gray-500",
};

export function StreamCard({ session, onStop }: StreamCardProps) {
  const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
  const totalPaid = (parseFloat(session.ratePerSec) * elapsed).toFixed(7);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusColor[session.status]}`} />
          <span className="text-sm font-medium text-gray-200 capitalize">
            {session.status}
          </span>
        </div>
        <span className="text-xs text-gray-500 uppercase">{session.mode}</span>
      </div>

      <div className="text-xs text-gray-400 font-mono space-y-1">
        <p>To: {session.receiver.slice(0, 12)}…{session.receiver.slice(-6)}</p>
        <p>Rate: {session.ratePerSec} XLM/s</p>
        <p>Paid: ~{totalPaid} XLM</p>
      </div>

      {session.status === "active" && onStop && (
        <button
          onClick={() => onStop(session.sessionId)}
          className="text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Stop stream
        </button>
      )}
    </div>
  );
}
