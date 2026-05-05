// Freighter wallet adapter
// @stellar/freighter-api v2.0.0 API

let freighterApi: typeof import("@stellar/freighter-api") | null = null;

async function getApi() {
  if (!freighterApi) {
    freighterApi = await import("@stellar/freighter-api");
  }
  return freighterApi;
}

export async function isFreighterInstalled(): Promise<boolean> {
  try {
    const api = await getApi();
    return api.isConnected();
  } catch {
    return false;
  }
}

export async function connectWallet(): Promise<string> {
  const api = await getApi();
  const connected = await api.isConnected();
  if (!connected) throw new Error("Freighter not installed");
  return api.getPublicKey();
}

export async function getWalletPublicKey(): Promise<string | null> {
  try {
    const api = await getApi();
    const connected = await api.isConnected();
    if (!connected) return null;
    return api.getPublicKey();
  } catch {
    return null;
  }
}

export async function signTx(xdr: string): Promise<string> {
  const api = await getApi();
  const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "TESTNET";
  return api.signTransaction(xdr, { network });
}
