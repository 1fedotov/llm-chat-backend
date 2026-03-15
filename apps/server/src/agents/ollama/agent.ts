import { AIMessageChunk } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, createAgent } from "langchain";

import { SessionHistoryMiddleware } from "./agent.middleware";

const llm = new ChatOllama({
  model: "gemma3",
  temperature: 0,
  maxRetries: 2,
});

const agent = createAgent({
  model: llm,
  middleware: [SessionHistoryMiddleware],
});

export async function* callAgent(sessionId: string, message: string) {
  try {
    const context = {
      sessionId,
    };
    const response = await agent.stream(
      { messages: [new HumanMessage(message)] },
      { context, streamMode: "messages" },
    );

    for await (const [messageChunk, _] of response) {
      // Only stream chunks from the "agent" node (the LLM)
      if (AIMessageChunk.isInstance(messageChunk) && messageChunk.content) {
        yield messageChunk.content;
      }
    }
  } catch (error) {
    console.error(error);
    return "Error from the AI!";
  }
}
