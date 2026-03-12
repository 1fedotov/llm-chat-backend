import mongoose from "mongoose";
import config from "../config/config";
import logger from "../utils/logger";


async function connectDB() {
    const dbUri = config.db_uri;

    try {
        await mongoose.connect(dbUri)
        .then(() => {
            logger.info(`Connected to database at URL: ${dbUri}`);
        });
    } catch (error) {
        logger.error("Could not connect to database!");
        logger.error(`Error message: ${error}`);
        process.exit(1);
    }
}

export default connectDB;