import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { logger } from "./logger/logger";

const app = express();
const PORT = process.env.PORT ?? 5000;
const MONGO_URL = process.env.MONGO_URL ?? "mongodb://localhost:27017/";

mongoose.connect(MONGO_URL).then(() => {
  logger.info(`Connected to database successfully on ${MONGO_URL}`);
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
