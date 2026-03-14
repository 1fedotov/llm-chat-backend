import { Request, Response, NextFunction } from "express"
import { findSession, findSessions, createSession } from "../services/session.service";
import { callAgent } from "../agents/ollama/agent"
import type { sendMessageInput } from "../schema/model.schema";
import sessionModel from "../models/session.model";

export async function getSessions(req: Request, res: Response) {
    const sessions = await findSessions({});

    return res.send(sessions);
}

export async function sendMessage(req: Request<sendMessageInput["params"], {}, sendMessageInput["body"]>, res: Response) {
    const { message } = req.body;
    const sessionId = req.params.sessionId;

    const aiResponse = await callAgent(sessionId, message);

    return res.json({sessionId, aiResponse});
}

export async function createSessionAndSendMessage(req: Request, res: Response) {
    const { message } = req.body;
    const sessionId = await createSession();

    const aiResponse = await callAgent(sessionId, message);

    return res.json({sessionId, aiResponse});

}

export async function getSessionMessages(req: Request, res: Response) {
    const sessionId = req.params.sessionId;
    const session = await findSession({ _id: sessionId });
    
    if (!session) {
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
