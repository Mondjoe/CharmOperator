export async function fetchsolanaState() {
  return {
    chain: "solana",
    height: 0,
    peers: 0,
    latencyMs: 0,
    health: "unknown",
  };
}