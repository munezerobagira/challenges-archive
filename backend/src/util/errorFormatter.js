import { ValidationError } from "joi";
import { JsonWebTokenError } from "jsonwebtoken";

const InternalServerError = "Sorry we have server error";
const errorFormatter = (error) => {
  if (error.constructor) {
    const { stack } = error;
    switch (error.constructor) {
      case ReferenceError:
      case TypeError:
      case SyntaxError:
      case InternalServerError:
        return {
          status: 500,
          message: InternalServerError,
          error: {
            stack,
          },
        };
      default:
        if (error instanceof ValidationError) {
          return {
            status: 400,
            message: error.message,
            error: {
              stack,
            },
          };
        }
        return {
          status: 400,
          message: stack,
          error: {
            stack,
          },
        };
    }
  }
};
export default errorFormatter;
