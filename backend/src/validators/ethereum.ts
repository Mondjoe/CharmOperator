const BEACON_API = "https://ethereum-beacon-api.publicnode.com";

// Replace with your validator index
const VALIDATOR_INDEX = "YOUR_VALIDATOR_INDEX";

export async function fetchEthereumValidator() {
  try {
    const res = await fetch(`${BEACON_API}/eth/v1/beacon/states/head/validators/${VALIDATOR_INDEX}`);
    const json = await res.json();

    const v = json.data;

    return {
      balance: Number(v.balance),
      status: v.status,
      activationEpoch: v.activation_epoch,
      exitEpoch: v.exit_epoch,
      slashed: v.slashed
    };
  } catch {
    return {
      balance: 0,
      status: "offline",
      activationEpoch: 0,
      exitEpoch: 0,
      slashed: false
    };
  }
}