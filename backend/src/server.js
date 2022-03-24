import express from "express";
import { port } from "./config";
import { Logger } from "./util";
import setupApp from "./setupApp";
const app = express();
setupApp(app);
const server = app.listen(port, () => {
  Logger.info(`Server is running on port:  ${port}`);
});
export default server;
