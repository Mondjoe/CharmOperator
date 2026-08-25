import { pushHistory } from "./history";
import { computeMetrics } from "./compute";

export function evaluateMetrics(multichain: any) {
  const metrics: Record<string, any> = {};

  for (const chain of multichain.chains) {
    pushHistory(chain.chain, {
      latency: chain.latency,
      height: chain.height,
      stake: chain.validator?.stake || 0,
      status: chain.status
    });

    metrics[chain.chain] = computeMetrics(chain.chain);
  }

  return metrics;
}