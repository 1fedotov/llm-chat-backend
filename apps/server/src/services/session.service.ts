import sessionModel from "../models/session.model";
import { QueryFilter } from "mongoose";
import { sessionDocument } from "../models/session.model";

export async function findSessions(query: QueryFilter<sessionDocument>) {
    return sessionModel.find(query).lean();
}

export async function findSession(query: QueryFilter<sessionDocument>) {
    return sessionModel.findOne(query);
}

export async function createSession(): Promise<string> {
    const newSession = await sessionModel.create({});
    return newSession._id.toString();
}

export async function deleteSession(sessionId: string) {
    await sessionModel.deleteOne({ _id: sessionId });
}

export async function addMessageToSession(sessionId: string, message: { role: string, content: string }) {
    await sessionModel.updateOne(
        { _id: sessionId },
        { $push: { messages: message } },
    );
}