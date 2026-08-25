// simple in-memory history store

const HISTORY: Record<string, any[]> = {};

export function pushHistory(chain: string, data: any) {
  if (!HISTORY[chain]) HISTORY[chain] = [];
  HISTORY[chain].push({ ts: Date.now(), ...data });

  // keep last 100 samples
  if (HISTORY[chain].length > 100) {
    HISTORY[chain].shift();
  }
}

export function getHistory(chain: string) {
  return HISTORY[chain] || [];
}