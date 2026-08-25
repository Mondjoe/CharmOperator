import { getEvmState, EvmChainState } from "./evmTemplate";

const BASE_RPC = "https://mainnet.base.org"; // replace if needed
const BASE_CHAIN_ID = 8453;

export async function getBaseState(): Promise<EvmChainState> {
  return getEvmState(BASE_RPC, "Base", BASE_CHAIN_ID);
}