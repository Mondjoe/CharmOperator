export function buildTokenomicsModel(transition: any) {
  return {
    supply: transition.plannedSupply,
    backingPerCoinUsd: transition.backingPerCoinUsd,
    phases: [
      { name: "Founders", allocation: 0.1 },
      { name: "Treasury", allocation: 0.3 },
      { name: "Community", allocation: 0.6 }
    ]
  };
}
