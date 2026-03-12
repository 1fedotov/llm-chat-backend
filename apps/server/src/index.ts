import express from "express";
import config from "./config/config";
import logger from "./utils/logger";
import connectDB from "./utils/connect";
import { createSession, 
    deleteSession, 
    getSessionMessages, 
    getSessions, 
    sendMessage 
} from "./controllers/session.controller";

const port = config.port;

const app = express();

app.get('/', (req, res) => {
    res.send(`${req}`);
});

app.listen(config.port, () => {
    logger.info(`App is running at http://localhost:${port}`);

    connectDB();

    // Get all sessions
    app.get('/chat', getSessions);
    // Create a new session
    app.post('/chat', createSession);
    // Get session messages
    app.get('/chat/:sessionId', getSessionMessages);
    // Send a message to a session
    app.post('/chat/:sessionId', sendMessage);
    // Delete a session
    app.delete('/chat:sessionId', deleteSession);

});

