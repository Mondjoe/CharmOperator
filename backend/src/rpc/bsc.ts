import { getEvmState, EvmChainState } from "./evmTemplate";

const BSC_RPC = "https://bsc-dataseed.binance.org"; // replace if needed
const BSC_CHAIN_ID = 56;

export async function getBscState(): Promise<EvmChainState> {
  return getEvmState(BSC_RPC, "BSC", BSC_CHAIN_ID);
}