import jwt from "jsonwebtoken";
import { tokenSecret } from "../config";
class Token {
  static generate(data) {
    this.token = jwt.sign(data, tokenSecret, { expiresIn: "1h" });
    return this.token;
  }

  static verifyToken(token) {
    return jwt.verify(token, tokenSecret);
  }
}
export default Token;
