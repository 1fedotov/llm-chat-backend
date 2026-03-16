// config.ts
import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  db_uri: string;
  llm_model: string;
  llm_url: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  db_uri: process.env.MONGODB_URL || "mongodb://localhost:27017/llm-chat-backend",
  llm_model: process.env.OLLAMA_MODEL || "qwen3.5:0.8b",
  llm_url: process.env.OLLAMA_URL || "http://ollama:11434",
};

export default config;
