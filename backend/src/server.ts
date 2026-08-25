import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import http from "http";
import { runAggregator } from "./multichain/aggregator";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  ws.send(JSON.stringify({ type: "welcome", message: "Validator backend online" }));
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/metrics", async (_req, res) => {
  const snapshot = await runAggregator();
  res.json(snapshot);
});

// NEW: snapshot route
app.get("/snapshot", async (_req, res) => {
  const snapshot = await runAggregator();
  res.json(snapshot);
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});