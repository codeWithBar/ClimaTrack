import express from "express";
import mongoose from "mongoose";
import { logger } from "./logger/logger";
import start from "./startup/routes";

const app = express();
const PORT = process.env.PORT ?? 5000;
const MONGO_URL = process.env.MONGO_URL ?? "mongodb://localhost:27017/";

start(app);

mongoose.connect(MONGO_URL).then(() => {
  logger.info(`Connected to database successfully on ${MONGO_URL}`);
});

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
