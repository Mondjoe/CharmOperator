// BSC validators via explorer or your own indexer

export interface BscValidator {
  address: string;
  name: string;
  votingPower: number;
  active: boolean;
}

const BSC_VALIDATOR_API =
  "https://api.bscscan.com/api"; // placeholder, or your own service

export async function getBscValidators(): Promise<BscValidator[]> {
  try {
    // Placeholder: you’ll replace with a real validator endpoint or your own indexer.
    const res = await fetch(
      `${BSC_VALIDATOR_API}?module=validator&action=list` // not real, just structure
    );
    const data = await res.json();

    const list: BscValidator[] = (data.result ?? []).map((v: any) => ({
      address: v.address,
      name: v.name ?? v.address,
      votingPower: Number(v.votingPower ?? 0),
      active: v.active ?? true,
    }));

    return list;
  } catch (err) {
    console.error("[BSC validators] error:", err);
    return [];
  }
}