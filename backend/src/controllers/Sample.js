import { apiVersion } from "../config/index.js";
class Sample {
  static async get(request, response) {
    return response
      .status(200)
      .json({ message: `Welcome to our api ${apiVersion} ` });
  }
  static async notFound(request, response) {
    return response
      .status(404)
      .json({ message: "Page you are looking for is not found" });
  }
}
export default Sample;
