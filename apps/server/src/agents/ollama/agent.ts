import { AIMessageChunk } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, createAgent } from "langchain";
import { SessionHistoryMiddleware } from "./agent.middleware";
import config from "../../config/config";
import logger from "../../utils/logger";


const llm = new ChatOllama({
  model: config.llm_model,
  baseUrl: config.llm_url,
  temperature: 0,
  maxRetries: 2,
  think: false,
});

const agent = createAgent({
  model: llm,
  middleware: [SessionHistoryMiddleware],
});

export async function checkLlm() {
  try {
    logger.info(`Waiting for a response from LLM at URL: ${config.llm_url}`);
    const response = await llm.invoke("Hello!");
    logger.info(`Connected to LLM at URL: ${config.llm_url}`);
  } catch (error) {
    logger.error("Could not connect to LLM!");
    logger.error(`Error message: ${error}`);
  }
}

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
