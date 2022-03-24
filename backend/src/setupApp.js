import express from "express";
import morgan from "morgan";
import fs from "fs";
import routes from "./routes";
const serverLogFile = fs.createWriteStream("./logs/server.log", { flags: "a" });
export const setupApp = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("combined", { stream: serverLogFile }));
  app.use(routes);
};
export default setupApp;
