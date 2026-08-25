// Generic EVM RPC template

export interface EvmChainState {
  chainId: number;
  name: string;
  latestBlock: number;
  gasPriceGwei: number;
  rpcUrl: string;
  healthy: boolean;
}

async function jsonRpcCall(
  rpcUrl: string,
  method: string,
  params: any[] = []
): Promise<any> {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

export async function getEvmState(
  rpcUrl: string,
  name: string,
  chainId: number
): Promise<EvmChainState> {
  try {
    const latestBlockHex = await jsonRpcCall(rpcUrl, "eth_blockNumber");
    const gasPriceHex = await jsonRpcCall(rpcUrl, "eth_gasPrice");

    const latestBlock = parseInt(latestBlockHex, 16);
    const gasPriceWei = BigInt(gasPriceHex);
    const gasPriceGwei = Number(gasPriceWei) / 1e9;

    return {
      chainId,
      name,
      latestBlock,
      gasPriceGwei,
      rpcUrl,
      healthy: true,
    };
  } catch (err) {
    console.error(`[EVM:${name}] RPC error:`, err);
    return {
      chainId,
      name,
      latestBlock: 0,
      gasPriceGwei: 0,
      rpcUrl,
      healthy: false,
    };
  }
}