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
      if (status === 500) Logger.error(err);
      else Logger.verbose(err);
      return response.status(status).json({ message });
    }
  }
}
export default Authentication;
