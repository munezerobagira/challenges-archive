import { errorFormatter } from "../util";
import Token from "../util/Token";

const loggedIn = async (request, ressponse, next) => {
  try {
    const token =
      request.headers.authorization &&
      request.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = await Token.verifyToken(token);
      request.user = decoded;
      return next();
    }
    return ressponse.status(401).json({
      message: "You are not logged in",
    });
  } catch (error) {
    const { status, message, error: err } = errorFormatter(error);
    return ressponse.status(status).json({ message });
  }
};
export default loggedIn;
