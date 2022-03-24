import Joi from "joi";
import { errorFormatter, Logger, Token } from "../util";
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
class Authentication {
  static async login(request, response) {
    try {
      const value = await loginSchema.validateAsync(request.body);
      const token = await Token.generate(value);
      return response.status(201).json({ token });
    } catch (error) {
      const { status, message, error: err } = errorFormatter(error);
      Logger.silly(err);
      return response.status(status).json({ message });
    }
  }
  static async loggedIn(request, response) {
    return response.status(200).json({ message: `You are logged in` });
  }
}
export default Authentication;
