import sessionModel from "../models/session.model";
import { QueryFilter } from "mongoose";
import { sessionDocument } from "../models/session.model";

export async function findSessions(query: QueryFilter<sessionDocument>) {
    return sessionModel.find(query);
}

export async function findSession(query: QueryFilter<sessionDocument>) {
    return sessionModel.findOne(query);
}