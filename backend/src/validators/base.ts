// Base L2 "validator" = sequencer status

export interface BaseValidatorStatus {
  name: string;
  sequencerOnline: boolean;
  lastBlockTime: string | null;
}

const BASE_EXPLORER_API = "https://api.basescan.org/api"; // placeholder

export async function getBaseValidators(): Promise<BaseValidatorStatus> {
  try {
    // This is a placeholder — you’ll replace with a real endpoint or your own logic.
    const res = await fetch(
      `${BASE_EXPLORER_API}?module=block&action=getblocknobytime&timestamp=${Math.floor(
        Date.now() / 1000
      )}&closest=before`
    );
    const data = await res.json();

    const lastBlockTime =
      data.result?.timeStamp ? new Date(Number(data.result.timeStamp) * 1000).toISOString() : null;

    return {
      name: "Base Sequencer",
      sequencerOnline: !!lastBlockTime,
      lastBlockTime,
    };
  } catch (err) {
    console.error("[Base validators] error:", err);
    return {
      name: "Base Sequencer",
      sequencerOnline: false,
      lastBlockTime: null,
    };
  }
}