import type { runMissionScenario } from "../simulation/missionScenario";

type Chains = any;
type Mission = ReturnType<typeof runMissionScenario>;

export function computeMetrics(chains: Chains, mission: Mission) {
  return {
    missionId: mission.id,
    avgLatencyMs: 0,
    totalPeers: 0,
    chainCount: Object.keys(chains).length,
  };
}