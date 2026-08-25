export function computeTransitionPlan(portfolio: any) {
  return {
    backingValueUsd: 0,      // later: sum from tokens
    plannedSupply: 1_000_000,
    backingPerCoinUsd: 0     // backingValueUsd / plannedSupply
  };
}
