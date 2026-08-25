// backend/src/routes/portfolio.ts
import express from "express";
import { buildPortfolioSnapshot } from "../engines/portfolio";

const router = express.Router();

router.get("/portfolio/snapshot", async (_req, res) => {
  res.json(await buildPortfolioSnapshot());
});

export default router;
