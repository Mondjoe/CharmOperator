import { ALERT_RULES } from "./rules";

export function evaluateAlerts(multichain: any) {
  const alerts: any[] = [];

  for (const chain of multichain.chains) {
    // 1 — Chain offline
    if (ALERT_RULES.chainOffline && chain.status === "offline") {
      alerts.push({
        level: "critical",
        chain: chain.chain,
        message: `${chain.chain} RPC is offline`
      });
    }

    // 2 — High latency
    if (chain.latency > ALERT_RULES.latency.critical) {
      alerts.push({
        level: "critical",
        chain: chain.chain,
        message: `${chain.chain} latency is critically high (${chain.latency}ms)`
      });
    } else if (chain.latency > ALERT_RULES.latency.warn) {
      alerts.push({
        level: "warning",
        chain: chain.chain,
        message: `${chain.chain} latency is high (${chain.latency}ms)`
      });
    }

    // 3 — Validator offline
    if (ALERT_RULES.validatorOffline && chain.validator?.stake === 0) {
      alerts.push({
        level: "critical",
        chain: chain.chain,
        message: `${chain.chain} validator appears offline`
      });
    }

    // 4 — Stake drop
    if (chain.validator?.nextEpochStake &&
        chain.validator?.stake &&
        chain.validator.nextEpochStake < chain.validator.stake) {

      const dropPercent =
        ((chain.validator.stake - chain.validator.nextEpochStake) /
          chain.validator.stake) * 100;

      if (dropPercent >= ALERT_RULES.stakeDropPercent) {
        alerts.push({
          level: "warning",
          chain: chain.chain,
          message: `${chain.chain} validator stake dropped by ${dropPercent.toFixed(2)}%`
        });
      }
    }

    // 5 — Slashed
    if (ALERT_RULES.slashed && chain.validator?.slashed === true) {
      alerts.push({
        level: "critical",
        chain: chain.chain,
        message: `${chain.chain} validator has been SLASHED`
      });
    }
  }

  return alerts;
}