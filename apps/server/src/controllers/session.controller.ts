import { NextFunction, Request, Response } from "express";

import { callAgent } from "../agents/ollama/agent.js";
import sessionModel from "../models/session.model";
import type { sendMessageInput } from "../schema/model.schema";
import { createSession, findSession, findSessions } from "../services/session.service";

export async function getSessions(req: Request, res: Response) {
  const sessions = await findSessions({});

  return res.send(sessions);
}

// Sends message to the AI and streams the response
export async function sendMessage(
  req: Request<sendMessageInput["params"], {}, sendMessageInput["body"]>,
  res: Response,
) {
  const { message } = req.body;
  const sessionId = req.params.sessionId;

  // 1. Set SSE headers to keep the connection open
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });

  try {
    // 2. Iterate through the generator
    for await (const chunk of callAgent(sessionId, message)) {
      // 3. Send data in SSE format
      res.write(`data: ${JSON.stringify({ sessionId, reply: chunk })}\n\n`);
    }
  } catch (error) {
    console.error("Streaming error:", error);
  } finally {
    // 4. Close the connection when done
    res.end();
  }

  // return res.json({sessionId, aiResponse});
}

// Creates session, sends message to the AI and streams the response
export async function createSessionAndSendMessage(req: Request, res: Response) {
  const { message } = req.body;
  const sessionId = await createSession();

  // 1. Set SSE headers to keep the connection open
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });

  try {
    // 2. Iterate through the generator
    for await (const chunk of callAgent(sessionId, message)) {
      // 3. Send data in SSE format
      res.write(`data: ${JSON.stringify({ sessionId, reply: chunk })}\n\n`);
    }
  } catch (error) {
    console.error("Streaming error:", error);
  } finally {
    // 4. Close the connection when done
    res.end();
  }
}

export async function getSessionMessages(req: Request, res: Response) {
  const sessionId = req.params.sessionId;
  const session = await findSession({ _id: sessionId });

  if (session == null) {
    return res.sendStatus(404);
  }

  const messages = session.messages;

  return res.send(messages);
}

export async function deleteSession(req: Request, res: Response) {
  const sessionId = req.params.sessionId;

  const result = await sessionModel.deleteOne({ _id: sessionId });

  if (result.deletedCount === 0) {
    return res.sendStatus(500);
  }

  return res.status(200).send(`Session ${sessionId} deleted.`);
}
