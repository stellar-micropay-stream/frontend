"use client";
import { useState } from "react";
import { useStream } from "@/hooks/useStream";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Rate range: 0.000001 – 0.01 XLM/s (slider 1–100 maps logarithmically)
function sliderToRate(v: number): string {
  const min = Math.log(0.000001);
  const max = Math.log(0.01);
  const rate = Math.exp(min + (v / 100) * (max - min));
  return rate.toFixed(7);
}

export function StreamControls() {
  const { startStream, stopStream, activeSessions } = useStream();
  const [receiver, setReceiver] = useState("");
  const [sliderVal, setSliderVal] = useState(50);
  const [mode, setMode] = useState<"onchain" | "channel">("onchain");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rate = sliderToRate(sliderVal);
  const costPerHour = (parseFloat(rate) * 3600).toFixed(4);
  const hasActive = activeSessions.length > 0;

  async function handleStart() {
    if (!receiver.trim()) return setError("Receiver address required");
    setError(null);
    setLoading(true);
    try {
      await startStream({ receiver: receiver.trim(), ratePerSec: rate, mode });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start stream");
    } finally {
      setLoading(false);
    }
  }

  async function handleStop(sessionId: string) {
    try {
      await stopStream(sessionId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to stop stream");
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-4">
      <h2 className="text-lg font-semibold text-gray-100">Stream Controls</h2>

      <Input
        label="Receiver Address"
        placeholder="G..."
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      <div className="space-y-1">
        <label className="text-sm text-gray-400">
          Rate: <span className="text-indigo-400">{rate} XLM/s</span>
          <span className="text-gray-500 ml-2">(~{costPerHour} XLM/hr)</span>
        </label>
        <input
          type="range"
          min={1}
          max={100}
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full accent-indigo-500"
          aria-label="Payment rate"
        />
      </div>

      <div className="flex gap-2">
        {(["onchain", "channel"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {m === "onchain" ? "On-chain" : "Channel"}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button onClick={handleStart} loading={loading} className="w-full">
        Start Stream
      </Button>

      {hasActive && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Active streams:</p>
          {activeSessions.map((s) => (
            <div
              key={s.sessionId}
              className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2"
            >
              <span className="text-xs text-gray-300 font-mono">
                {s.receiver.slice(0, 8)}… · {s.ratePerSec} XLM/s
              </span>
              <Button
                variant="danger"
                className="text-xs px-2 py-1"
                onClick={() => handleStop(s.sessionId)}
              >
                Stop
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
