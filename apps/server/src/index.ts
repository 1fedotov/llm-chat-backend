import express from "express";

import config from "./config/config.js";
import {
  createSessionAndSendMessage,
  deleteSession,
  getSessionMessages,
  getSessions,
  sendMessage,
} from "./controllers/session.controller";
import validate from "./middleware/validateResourse.js";
import { sendMessageSchema } from "./schema/model.schema";
import connectDB from "./utils/connect.js";
import logger from "./utils/logger.js";
import { checkLlm } from "./agents/ollama/agent";

const port = config.port;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`${req}`);
});

app.listen(config.port, () => {
  logger.info(`App is running at http://localhost:${port}`);

  connectDB();
  checkLlm();

  // Get all sessions
  app.get("/chat", getSessions);
  // Create a new session
  app.post("/chat", createSessionAndSendMessage);
  // Get session messages
  app.get("/chat/:sessionId", getSessionMessages);
  // Send a message to a session
  app.post("/chat/:sessionId", validate(sendMessageSchema), sendMessage);
  // Delete a session
  app.delete("/chat/:sessionId", deleteSession);
});
