import { Request, Response, NextFunction } from "express"
import { findSession, findSessions } from "../services/session.service";


export async function createSession(req: Request, res: Response) {

}

export async function getSessions(req: Request, res: Response) {
    const sessions = await findSessions({});
    return res.send(sessions);
}

export async function sendMessage(req: Request, res: Response) {
    const sessionId = req.params.sessionId;
    const message = req.body.message;

    // Send sessionId and message to our Agent and receive answer
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

}
