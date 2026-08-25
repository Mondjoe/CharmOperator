export async function fetchSuiState() {
  return {
    chain: "sui",
    height: 0,
    peers: 0,
    latencyMs: 0,
    health: "unknown",
  };
}
