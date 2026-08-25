import { importLegacyData } from "../legacy/ingestion";

export async function buildPortfolioSnapshot() {
  const legacy = await importLegacyData();
  return {
    totalWallets: legacy.wallets.length,
    totalTokens: legacy.tokens.length,
    totalNfts: legacy.nfts.length,
    totalContracts: legacy.contracts.length
  };
}
