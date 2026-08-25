import { getEvmState } from "./evmTemplate";

const POLYGON_RPC = "https://polygon-rpc.com";
const POLYGON_CHAIN_ID = 137;

export async function getPolygonState() {
  return getEvmState(POLYGON_RPC, "Polygon", POLYGON_CHAIN_ID);
}