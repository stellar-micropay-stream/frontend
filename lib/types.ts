export interface StreamSession {
  sessionId: string;
  sender: string;
  receiver: string;
  ratePerSec: string;
  mode: "onchain" | "channel";
  startedAt: number;
  lastPaymentAt: number;
  status: "active" | "paused" | "closed";
}

export interface ChannelState {
  channelId: string;
  contractId: string;
  sender: string;
  receiver: string;
  depositAmount: string;
  senderBalance: string;
  receiverBalance: string;
  sequenceNumber: number;
  senderSig: string;
  receiverSig: string;
  status: "open" | "closed";
}

export interface PaymentEvent {
  type: "payment";
  sessionId: string;
  sender: string;
  receiver: string;
  amount: string;
  timestamp: number;
}
