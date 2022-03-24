import { applyPatch } from "fast-json-patch";
import Joi from "joi";
const schema = Joi.object({
  json: Joi.required(),
  patch: Joi.required(),
});
import { errorFormatter, Logger } from "../util";
class Json {
  static async patch(request, response) {
    try {
      const { json, patch } = await schema.validateAsync(request.body);
      const patchedJson = applyPatch(json, patch).newDocument;
      response.status(200).json({ patchedJson });
    } catch (error) {
      const { status, message, error: err } = errorFormatter(error);
      Logger.error(err);
      return response.status(status).json({ message });
    }
  }
}
export default Json;
