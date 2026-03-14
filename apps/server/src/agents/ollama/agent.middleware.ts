import { request } from "express";
import { createMiddleware, AIMessage, BaseMessage, HumanMessage } from "langchain";
import z from "zod";
import { createSession, findSession, addMessageToSession } from "../../services/session.service";

const contextSchema = z.object({
    sessionId: z.string(),
})

export const SessionHistoryMiddleware = createMiddleware({
    name: "SessionHistoryMiddleware",
    contextSchema,
    beforeModel: async (runtime, state) => {
        // Download chat history and update 
        const { sessionId } = state.context;
        
        try {
            const session = await findSession({ _id: sessionId });
            if (!session) {
                throw new Error("Session not found");
            }
            const messages = session.messages;

            console.log(`Session messages: ${messages}`);

            const getChatHistory = (messages: any[]) : BaseMessage[] => {
                return messages.map(message => {
                    if (message.role === "user") {
                        return new HumanMessage(message.content);
                    } else if(message.role === "ai") {
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

            const chatContext = [
                ...getChatHistory(messages),
            ]
            
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
})

export const LoggingMiddleware = createMiddleware({
    name: "LoggingMiddleware",
    contextSchema,
    beforeModel: (runtime, state) => {
        console.log(`Hello from the agent's LoggingMiddleware!`);
        const { sessionId } = state.context;
        console.log(`SessionId: ${sessionId}`);

        let messages = runtime.messages;
        console.log(`First message: ${messages[0].content}`);
        console.log(`Messages length: ${messages.length}`);
        console.log(`Messages: ${messages}`);

        runtime.messages = [new HumanMessage("Tell me a little joke!"), ...messages]
        messages = runtime.messages;
        console.log(`First message: ${messages[0].content}`);
        console.log(`Messages length: ${messages.length}`);
        console.log(`Messages: ${messages}`);

        return {
            messages,
        };
    },
})
