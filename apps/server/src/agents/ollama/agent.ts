import { ChatOllama } from "@langchain/ollama";
import { createAgent, HumanMessage } from "langchain";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatPromptTemplate, MessagesPlaceholder, } from "@langchain/core/prompts";
import { Collection, Document as MongoDBDocument, } from "mongodb";
import { LoggingMiddleware, SessionHistoryMiddleware } from "./agent.middleware";

const llm = new ChatOllama({
    model: "gemma3",
    temperature: 0,
    maxRetries: 2,
})

const agent = createAgent({
    model: llm,
    middleware: [SessionHistoryMiddleware],
});

// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", "You're an assistant who's good at {ability}"],
//   new MessagesPlaceholder("history"),
//   ["human", "{question}"],
// ]);

// const chain = prompt.pipe(llm);

// export async function sendMessageToAI(sessionId: string, message: string, collection: Collection<Document>) {
//     const agentWithHistory = new RunnableWithMessageHistory({
//         runnable: chain,
//         getMessageHistory: () => new MongoDBChatMessageHistory({
//             collection,
//             sessionId
//         }),
//         inputMessagesKey: "content",
//         historyMessagesKey: "messages"
//         });
// }

export async function callAgent(sessionId: string, message: string): Promise<string> {
    try {
        const context = {
            sessionId,
        }
        const response = await agent.invoke({messages: [new HumanMessage(message)] }, {context});

        return response.messages[response.messages.length - 1].content as string;

    } catch (error) {
        console.error(error);
        return "Error from the AI!"
    }
}