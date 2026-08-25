export async function getOptimismValidators() {
  return [
    {
      name: "Optimism Sequencer",
      active: true,
      lastBlockTime: new Date().toISOString()
    }
  ];
}
