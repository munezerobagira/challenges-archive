import express from "express";
import morgan from "morgan";
import fs from "fs";
export { default as isLoggedIn } from "./isLoggedIn";
export const setupAppMiddlewares = (app) => {
  app.use(express.json());
  app.use(
    morgan("combined", {
      stream: fs.createWriteStream("./logs/server.log", { flags: "a" }),
    })
  );
  app.use(express.urlencoded({ extended: true }));
};
