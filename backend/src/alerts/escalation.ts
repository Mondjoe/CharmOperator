export function escalateAlert(chain: any, metrics: any, anomalies: any[], scores: any) {
  let level = "low";

  // Critical anomalies
  if (anomalies.some(a => a.severity === "critical")) {
    level = "critical";
  }

  // Chain score
  if (scores.chainScore < 50) {
    level = "high";
  }

  // Validator score
  if (scores.validatorScore < 50) {
    level = "high";
  }

  // Uptime issues
  if (metrics.uptime < 0.90) {
    level = "high";
  }

  // Latency spikes
  if (chain.latency > metrics.avgLatency * 2) {
    level = "medium";
  }

  // Height stall
  if (metrics.heightDelta <= 0) {
    level = "critical";
  }

  return level;
}