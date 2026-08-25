export async function fetchTronState() {
  return {
    chain: "tron",
    height: 0,
    peers: 0,
    latencyMs: 0,
    health: "unknown",
  };
}
