// TON via toncenter or similar API

export interface TonState {
  name: string;
  latestBlockSeqno: number;
  masterchainSeqno: number;
  validatorCount: number;
  rpcUrl: string;
  healthy: boolean;
}

const TON_API = "https://toncenter.com/api/v2"; // replace with your endpoint
const TON_API_KEY = ""; // optional, if required

async function tonGet(path: string, params: Record<string, any> = {}): Promise<any> {
  const url = new URL(`${TON_API}/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  if (TON_API_KEY) url.searchParams.set("api_key", TON_API_KEY);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (!data.ok) throw new Error(data.error ?? "TON API error");
  return data.result;
}

export async function getTonState(): Promise<TonState> {
  try {
    const masterInfo = await tonGet("getMasterchainInfo");
    const validators = await tonGet("getValidators");

    const latestBlockSeqno = masterInfo.last ?? 0;
    const masterchainSeqno = masterInfo.last ?? 0;
    const validatorCount = (validators.validators ?? []).length;

    return {
      name: "TON",
      latestBlockSeqno,
      masterchainSeqno,
      validatorCount,
      rpcUrl: TON_API,
      healthy: true,
    };
  } catch (err) {
    console.error("[TON] API error:", err);
    return {
      name: "TON",
      latestBlockSeqno: 0,
      masterchainSeqno: 0,
      validatorCount: 0,
      rpcUrl: TON_API,
      healthy: false,
    };
  }
}