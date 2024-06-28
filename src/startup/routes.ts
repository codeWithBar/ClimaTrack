import express from "express";
import weatherRouter from "../routes/weather";
import home from "../routes/homepage";

export default function (app: express.Application) {
  app.use(express.json());
  app.use("/api/weather", weatherRouter);
  app.use("/api/helloworld", home);
}
