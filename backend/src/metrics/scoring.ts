export function scoreChain(chain: any, metrics: any, alerts: any[]) {
  let score = 100;

  // 1 — Latency impact
  if (metrics.avgLatency > 300) score -= 20;
  else if (metrics.avgLatency > 150) score -= 10;

  // 2 — Uptime impact
  if (metrics.uptime < 0.95) score -= 20;
  else if (metrics.uptime < 0.99) score -= 10;

  // 3 — Alerts impact
  const chainAlerts = alerts.filter(a => a.chain === chain.chain);
  for (const a of chainAlerts) {
    if (a.level === "critical") score -= 30;
    if (a.level === "warning") score -= 10;
  }

  // 4 — Height movement
  if (metrics.heightDelta <= 0) score -= 15;

  // 5 — Chain offline
  if (chain.status !== "online") score -= 40;

  return Math.max(0, Math.min(100, score));
}

export function scoreValidator(chain: any, metrics: any, alerts: any[]) {
  let score = 100;
  const v = chain.validator;

  // 1 — Stake impact
  if (v.stake < 1) score -= 40;
  else if (v.nextEpochStake < v.stake) score -= 20;

  // 2 — Commission impact
  if (v.commission > 10) score -= 10;

  // 3 — Alerts impact
  const chainAlerts = alerts.filter(a => a.chain === chain.chain);
  for (const a of chainAlerts) {
    if (a.level === "critical") score -= 30;
    if (a.level === "warning") score -= 10;
  }

  // 4 — Uptime impact
  if (metrics.uptime < 0.95) score -= 20;

  return Math.max(0, Math.min(100, score));
}