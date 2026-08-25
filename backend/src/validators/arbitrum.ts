export async function getArbitrumValidators() {
  return [
    {
      name: "Arbitrum Sequencer",
      active: true,
      lastBlockTime: new Date().toISOString()
    }
  ];
}