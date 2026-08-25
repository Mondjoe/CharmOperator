const SUI_RPC = "https://fullnode.mainnet.sui.io:443";

// Replace with your validator address
const VALIDATOR_ADDRESS = "0xYOUR_SUI_VALIDATOR_ADDRESS";

export async function fetchSuiValidator() {
  try {
    const res = await fetch(SUI_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "sui_getValidatorSummary"
      })
    });

    const json = await res.json();
    const validators = json.result.activeValidators;

    const me = validators.find((v: any) => v.suiAddress === VALIDATOR_ADDRESS);

    if (!me) {
      return {
        name: "Unknown",
        stake: 0,
        votingPower: 0,
        commission: 0,
        nextEpochStake: 0
      };
    }

    return {
      name: me.name,
      stake: Number(me.stakeAmount),
      votingPower: Number(me.votingPower),
      commission: Number(me.commissionRate),
      nextEpochStake: Number(me.nextEpochStake)
    };
  } catch {
    return {
      name: "Offline",
      stake: 0,
      votingPower: 0,
      commission: 0,
      nextEpochStake: 0
    };
  }
}