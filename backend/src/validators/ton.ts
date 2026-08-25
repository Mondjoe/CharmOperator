// TON validators via toncenter or similar

export interface TonValidator {
  address: string;
  stake: number;
  active: boolean;
}

const TON_API = "https://toncenter.com/api/v2"; // same as rpc/ton.ts
const TON_API_KEY = ""; // optional

async function tonGet(path: string, params: Record<string, any> = {}): Promise<any> {
  const url = new URL(`${TON_API}/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  if (TON_API_KEY) url.searchParams.set("api_key", TON_API_KEY);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (!data.ok) throw new Error(data.error ?? "TON API error");
  return data.result;
}

export async function getTonValidators(): Promise<TonValidator[]> {
  try {
    const validators = await tonGet("getValidators");
    const list: TonValidator[] = (validators.validators ?? []).map((v: any) => ({
      address: v.address,
      stake: Number(v.stake ?? 0),
      active: v.active ?? true,
    }));
    return list;
  } catch (err) {
    console.error("[TON validators] error:", err);
    return [];
  }
}