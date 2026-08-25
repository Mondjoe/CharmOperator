import { getEvmState } from "./evmTemplate";

const AVAX_RPC = "https://api.avax.network/ext/bc/C/rpc";
const AVAX_CHAIN_ID = 43114;

export async function getAvalancheState() {
  return getEvmState(AVAX_RPC, "Avalanche", AVAX_CHAIN_ID);
}