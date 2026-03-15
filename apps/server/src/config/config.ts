// config.ts
import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  db_uri: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  db_uri: process.env.MONGODB_URI || "mongodb://localhost:27017/llm-chat-backend",
};

export default config;
