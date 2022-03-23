import express from "express";
import routes from "./routes";
import { port } from "./config";
import logger from "./util/logger";
const app = express();
app.use(routes);
const server = app.listen(port, () => {
  logger.info(`Server is running on port:  ${port}`);
});
export default server