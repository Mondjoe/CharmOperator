import { getEvmState } from "./evmTemplate";

const OPTIMISM_RPC = "https://mainnet.optimism.io";
const OPTIMISM_CHAIN_ID = 10;

export async function getOptimismState() {
  return getEvmState(OPTIMISM_RPC, "Optimism", OPTIMISM_CHAIN_ID);
}