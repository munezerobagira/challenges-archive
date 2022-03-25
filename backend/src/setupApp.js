import express from "express";
import morgan from "morgan";
import { createWriteStream } from "fs";
import { resolve } from "path";
import routes from "./routes";
const serverLogFile = createWriteStream("./logs/server.log", { flags: "a" });
export const setupApp = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("combined", { stream: serverLogFile }));
  app.use(express.static(resolve("public")));
  app.use(routes);
};
export default setupApp;
