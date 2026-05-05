import { create } from "zustand";
import type { StreamSession, ChannelState, PaymentEvent } from "@/lib/types";

interface StreamStore {
  publicKey: string | null;
  token: string | null;
  activeSessions: StreamSession[];
  openChannels: ChannelState[];
  recentPayments: PaymentEvent[];

  setPublicKey: (key: string | null) => void;
  setToken: (token: string | null) => void;
  addSession: (s: StreamSession) => void;
  updateSession: (id: string, patch: Partial<StreamSession>) => void;
  removeSession: (id: string) => void;
  addChannel: (c: ChannelState) => void;
  updateChannel: (id: string, patch: Partial<ChannelState>) => void;
  appendPayment: (p: PaymentEvent) => void;
  clearPayments: () => void;
}

export const useStreamStore = create<StreamStore>((set) => ({
  publicKey: null,
  token: null,
  activeSessions: [],
  openChannels: [],
  recentPayments: [],

  setPublicKey: (key) => set({ publicKey: key }),
  setToken: (token) => set({ token }),

  addSession: (s) =>
    set((state) => ({ activeSessions: [...state.activeSessions, s] })),

  updateSession: (id, patch) =>
    set((state) => ({
      activeSessions: state.activeSessions.map((s) =>
        s.sessionId === id ? { ...s, ...patch } : s
      ),
    })),

  removeSession: (id) =>
    set((state) => ({
      activeSessions: state.activeSessions.filter((s) => s.sessionId !== id),
    })),

  addChannel: (c) =>
    set((state) => ({ openChannels: [...state.openChannels, c] })),

  updateChannel: (id, patch) =>
    set((state) => ({
      openChannels: state.openChannels.map((c) =>
        c.channelId === id ? { ...c, ...patch } : c
      ),
    })),

  appendPayment: (p) =>
    set((state) => ({
      recentPayments: [p, ...state.recentPayments].slice(0, 50),
    })),

  clearPayments: () => set({ recentPayments: [] }),
}));
