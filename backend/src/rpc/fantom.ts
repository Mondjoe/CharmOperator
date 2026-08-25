import { getEvmState } from "./evmTemplate";

const FANTOM_RPC = "https://rpc.ftm.tools";
const FANTOM_CHAIN_ID = 250;

export async function getFantomState() {
  return getEvmState(FANTOM_RPC, "Fantom", FANTOM_CHAIN_ID);
}