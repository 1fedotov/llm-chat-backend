import { AIMessage, BaseMessage, HumanMessage, createMiddleware } from "langchain";
import z from "zod";

import { addMessageToSession, findSession } from "../../services/session.service";

const contextSchema = z.object({
  sessionId: z.string(),
});

// Middleware which allows Langchain ReAct Agent to save/download its conversations into/from MongoDB
export const SessionHistoryMiddleware = createMiddleware({
  name: "SessionHistoryMiddleware",
  contextSchema,
  beforeModel: async (runtime, state) => {
    // Download chat history and update
    const { sessionId } = state.context;

    try {
      const session = await findSession({ _id: sessionId });
      if (session == null) {
        throw new Error("Session not found");
      }
      const messages = session.messages;

      console.log(`Session messages: ${messages}`);

      const getChatHistory = (messages: any[]): BaseMessage[] => {
        return messages.map((message) => {
          if (message.role === "user") {
            return new HumanMessage(message.content);
          } else if (message.role === "ai") {
            return new AIMessage(message.content);
          } else {
            return new HumanMessage(message.content);
          }
        });
      };

      const inputMessage = runtime.messages[0];
      console.log(`Input message: ${inputMessage}`);

      addMessageToSession(state.context.sessionId, {
        role: inputMessage.type,
        content: inputMessage.content as string,
      });

      const chatContext = [...getChatHistory(messages)];

      console.log(`Chat context: ${chatContext}`);

      return {
        messages: chatContext,
      };
    } catch (error) {
      console.error(error);
    }
  },
  afterModel: async (runtime, state) => {
    const lastMessage = runtime.messages[runtime.messages.length - 1];
    console.log(`Last message: ${lastMessage}`);
    addMessageToSession(state.context.sessionId, {
      role: lastMessage.type,
      content: lastMessage.content as string,
    });
  },
});
