import { getEvmState } from "./evmTemplate";

const ARBITRUM_RPC = "https://arb1.arbitrum.io/rpc";
const ARBITRUM_CHAIN_ID = 42161;

export async function getArbitrumState() {
  return getEvmState(ARBITRUM_RPC, "Arbitrum", ARBITRUM_CHAIN_ID);
}