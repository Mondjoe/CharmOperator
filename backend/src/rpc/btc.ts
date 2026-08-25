// Simple BTC RPC using a Bitcoin Core–compatible endpoint

export interface BtcState {
  name: string;
  latestBlock: number;
  mempoolSize: number;
  feeRateSatPerVByte: number;
  rpcUrl: string;
  healthy: boolean;
}

const BTC_RPC = "http://localhost:8332"; // replace with your node or provider

async function btcRpcCall(method: string, params: any[] = []): Promise<any> {
  const res = await fetch(BTC_RPC, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // add auth header if needed: "Authorization": "Basic ..."
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: "btc",
      method,
      params,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

export async function getBtcState(): Promise<BtcState> {
  try {
    const blockchainInfo = await btcRpcCall("getblockchaininfo");
    const mempoolInfo = await btcRpcCall("getmempoolinfo");
    // fee estimate for next block
    const feeEstimate = await btcRpcCall("estimatesmartfee", [1]);

    const latestBlock = blockchainInfo.blocks ?? 0;
    const mempoolSize = mempoolInfo.size ?? 0;
    const feeRateSatPerVByte =
      (feeEstimate.feerate ?? 0) * 1e8 /* BTC → sat */ / 1000 /* kb → vbyte approx */;

    return {
      name: "Bitcoin",
      latestBlock,
      mempoolSize,
      feeRateSatPerVByte,
      rpcUrl: BTC_RPC,
      healthy: true,
    };
  } catch (err) {
    console.error("[BTC] RPC error:", err);
    return {
      name: "Bitcoin",
      latestBlock: 0,
      mempoolSize: 0,
      feeRateSatPerVByte: 0,
      rpcUrl: BTC_RPC,
      healthy: false,
    };
  }
}