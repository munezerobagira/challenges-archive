import express from "express";
import routes from "./routes";
import { port } from "./config";
import { Logger } from "./util";
import { setupAppMiddlewares } from "./middlewares";
const app = express();
setupAppMiddlewares(app);
app.use(routes);
const server = app.listen(port, () => {
  Logger.info(`Server is running on port:  ${port}`);
});
export default server;
