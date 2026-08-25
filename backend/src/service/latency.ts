export async function measureLatency(url: string): Promise<number> {
  const start = Date.now();
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}"
    });
    return Date.now() - start;
  } catch {
    return -1;
  }
}
