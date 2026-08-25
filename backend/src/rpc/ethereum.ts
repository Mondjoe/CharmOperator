export async function fetchEthereumState() {
  return {
    chain: "ethereum",
    height: 0,
    peers: 0,
    latencyMs: 0,
    health: "unknown",
  };
}