import { ConnectButton } from "@/components/wallet/ConnectButton";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-gray-100">
          ⚡ Stellar MicroPay Stream
        </h1>
        <p className="text-xl text-gray-400 max-w-lg">
          Real-time per-second micropayments on Stellar. Start streaming XLM to
          any address instantly.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <ConnectButton />
        <a
          href="/dashboard"
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Go to Dashboard →
        </a>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8 text-center">
        {[
          { icon: "🔒", title: "Non-custodial", desc: "Keys never leave your browser" },
          { icon: "⚡", title: "Per-second", desc: "Stream XLM at any rate" },
          { icon: "🔗", title: "On-chain or Channel", desc: "Choose your settlement mode" },
        ].map((f) => (
          <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="font-semibold text-gray-200">{f.title}</div>
            <div className="text-sm text-gray-500 mt-1">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
