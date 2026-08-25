export function detectAnomalies(chain: any, metrics: any, alerts: any[]) {
  const anomalies: any[] = [];

  // 1 — Latency Spike
  if (chain.latency > metrics.avgLatency * 1.8 && metrics.avgLatency > 0) {
    anomalies.push({
      type: "latency_spike",
      severity: "warning",
      message: `${chain.chain} latency spike detected (${chain.latency}ms)`
    });
  }

  // 2 — Height Stall
  if (metrics.heightDelta <= 0) {
    anomalies.push({
      type: "height_stall",
      severity: "critical",
      message: `${chain.chain} height not increasing — possible stall`
    });
  }

  // 3 — Stake Drop
  if (
    chain.validator?.nextEpochStake &&
    chain.validator?.stake &&
    chain.validator.nextEpochStake < chain.validator.stake
  ) {
    const dropPercent =
      ((chain.validator.stake - chain.validator.nextEpochStake) /
        chain.validator.stake) * 100;

    if (dropPercent >= 5) {
      anomalies.push({
        type: "stake_drop",
        severity: "warning",
        message: `${chain.chain} validator stake dropped ${dropPercent.toFixed(2)}%`
      });
    }
  }

  // 4 — Validator Instability
  if (metrics.uptime < 0.90) {
    anomalies.push({
      type: "validator_unstable",
      severity: "critical",
      message: `${chain.chain} validator uptime unstable (${(metrics.uptime * 100).toFixed(1)}%)`
    });
  }

  // 5 — RPC Degradation
  if (chain.status === "online" && chain.latency > 400) {
    anomalies.push({
      type: "rpc_degraded",
      severity: "warning",
      message: `${chain.chain} RPC degraded — high latency`
    });
  }

  // 6 — Chain Offline Prediction
  if (chain.status === "online" && metrics.uptime < 0.85) {
    anomalies.push({
      type: "offline_prediction",
      severity: "critical",
      message: `${chain.chain} may go offline soon — uptime dropping`
    });
  }

  // 7 — Alerts Integration
  for (const a of alerts.filter((x) => x.chain === chain.chain)) {
    anomalies.push({
      type: "alert_sync",
      severity: a.level,
      message: a.message
    });
  }

  return anomalies;
}