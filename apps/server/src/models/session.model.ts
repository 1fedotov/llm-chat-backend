import mongoose from "mongoose";

// OpenAI chat completions format of messages
const messageSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false },
);

export interface sessionDocument extends mongoose.Document {
  title: string;
  messages: (typeof messageSchema)[];
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<sessionDocument>(
  {
    title: { type: String, default: "New Chat" },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  },
);

const sessionModel = mongoose.model<sessionDocument>("Session", sessionSchema);

export default sessionModel;
