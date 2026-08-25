const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

// Replace with your validator identity pubkey
const VALIDATOR_IDENTITY = "YOUR_SOLANA_VALIDATOR_PUBKEY";

export async function fetchSolanaValidator() {
  try {
    const res = await fetch(SOLANA_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getVoteAccounts"
      })
    });

    const json = await res.json();
    const all = json.result.current.concat(json.result.delinquent);

    const me = all.find((v: any) => v.nodePubkey === VALIDATOR_IDENTITY);

    if (!me) {
      return {
        stake: 0,
        commission: 0,
        skippedSlots: 0,
        rootSlot: 0
      };
    }

    return {
      stake: me.activatedStake,
      commission: me.commission,
      skippedSlots: me.skippedSlots,
      rootSlot: me.rootSlot
    };
  } catch {
    return {
      stake: 0,
      commission: 0,
      skippedSlots: 0,
      rootSlot: 0
    };
  }
}