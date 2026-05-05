# stellar-micropay-stream / frontend

Real-time micropayment streaming UI built on Stellar. Connect your Freighter wallet, stream XLM per-second to any address, and monitor live payment events — all non-custodial.

Part of the [stellar-micropay-stream](https://github.com/stellar-micropay-stream) org alongside `contract` (Soroban) and `backend` (Express orchestrator).

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Wallet | Freighter (`@stellar/freighter-api`) |
| State | Zustand |
| Real-time | Native `EventSource` (SSE) |
| Tests | Jest + Testing Library |

---

## Getting Started

```bash
cp .env.local.example .env.local   # fill in values
npm install
npm run dev                         # http://localhost:3000
```

### Environment Variables

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_ESCROW_CONTRACT_ID=C...
```

The backend must be running on `NEXT_PUBLIC_BACKEND_URL`. See the [`backend`](https://github.com/stellar-micropay-stream/backend) repo.

---

## Project Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Landing — connect wallet CTA
  dashboard/page.tsx    # Active streams + live payment feed
components/
  ui/                   # Button, Input, Modal
  wallet/               # ConnectButton, WalletStatus
  stream/               # StreamControls, StreamCard, PaymentTicker
hooks/
  useWallet.ts          # Freighter connect / sign
  useStream.ts          # Start/stop streams, SSE listener
lib/
  types.ts              # Shared TypeScript types
  api.ts                # Backend API client + SSE helper
  freighter.ts          # Freighter wallet adapter
store/
  streamStore.ts        # Zustand global state
__tests__/              # Jest + Testing Library tests
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — wallet connect |
| `/dashboard` | Stream controls, active sessions, live payment ticker |

---

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm test         # run tests (25 tests, 6 suites)
npm run lint     # ESLint
```

---

## How It Works

1. **Connect** — Freighter wallet connects in-browser; private keys never leave the extension.
2. **Stream** — Enter a receiver address, set a rate (0.000001–0.01 XLM/s), choose on-chain or payment channel mode, hit Start.
3. **Monitor** — Live payment events arrive via SSE from the backend and update the ticker in real time.
4. **Stop** — Close the stream at any time; leftover deposit is refunded by the Soroban contract.

### Payment Modes

- **On-chain** — backend submits a Stellar transaction every ~2 seconds.
- **Channel** — funds locked in a Soroban escrow contract; state updates happen off-chain with only 2 chain transactions per session (open + close).

---

## Prerequisites

- Node.js 20+
- [Freighter](https://www.freighter.app/) browser extension
- A funded Stellar testnet account ([friendbot](https://friendbot.stellar.org))
- Backend + contracts running (see org repos)
