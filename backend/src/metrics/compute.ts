import { getHistory } from "./history";

export function computeMetrics(chain: string) {
  const history = getHistory(chain);

  if (history.length < 2) {
    return {
      avgLatency: null,
      heightDelta: null,
      stakeDelta: null,
      uptime: null
    };
  }

  const latencies = history.map(h => h.latency).filter(n => n >= 0);
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;

  const heightDelta = history[history.length - 1].height - history[0].height;

  const stakeDelta =
    history[history.length - 1].stake - history[0].stake;

  const uptime =
    history.filter(h => h.status === "online").length /
    history.length;

  return {
    avgLatency,
    heightDelta,
    stakeDelta,
    uptime
  };
}