import mongoose from "mongoose";
import z from "zod";

const messageSchema = new mongoose.Schema({
    role: { type: String, required: true },
    content: { type: String, required: true }
})

export interface SessionDocument extends mongoose.Document {
    title: string;
    messages: z.infer<typeof messageSchema[]>;
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument> ({
    title: { type:String, default: 'New Chat'},
    messages: [messageSchema],
}, {
    timestamps: true
})

const sessionModel = mongoose.model('Session', sessionSchema);

export default sessionModel;