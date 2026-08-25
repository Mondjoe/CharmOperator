const TRON_API = "https://api.trongrid.io";

export async function fetchTronValidator() {
  try {
    const res = await fetch(`${TRON_API}/wallet/listwitnesses`);
    const json = await res.json();

    // Replace with your SR name
    const SR_NAME = "YOUR_TRON_SR_NAME";

   const me = json.witnesses.find((w: any) => w.url.includes(SR_NAME));

    if (!me) {
      return {
        voteCount: 0,
        url: "",
        totalProduced: 0,
        totalMissed: 0
      };
    }

    return {
      voteCount: me.voteCount,
      url: me.url,
      totalProduced: me.totalProduced,
      totalMissed: me.totalMissed
    };
  } catch {
    return {
      voteCount: 0,
      url: "",
      totalProduced: 0,
      totalMissed: 0
    };
  }
}