import { QueryFilter } from "mongoose";

import sessionModel from "../models/session.model";
import { sessionDocument } from "../models/session.model";

export async function findSessions(query: QueryFilter<sessionDocument>) {
  return sessionModel.find(query).select({ messages: 0 }).lean();
}

export async function findSession(query: QueryFilter<sessionDocument>) {
  return sessionModel.findOne(query).lean();
}

export async function createSession(): Promise<string> {
  const newSession = await sessionModel.create({});
  return newSession._id.toString();
}

export async function deleteSession(sessionId: string) {
  await sessionModel.deleteOne({ _id: sessionId });
}

export async function addMessageToSession(
  sessionId: string,
  message: { role: string; content: string },
) {
  await sessionModel.updateOne({ _id: sessionId }, { $push: { messages: message } });
}
