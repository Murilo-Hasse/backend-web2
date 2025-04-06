import { StatusCodes } from "http-status-codes";

export class BaseController {
  // Common success response
  static success(res, data, message = "Success", statusCode = StatusCodes.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  // Common error response
  static error(
    res,
    message = "Internal Server Error",
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    errors = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  // Handle async operations with try-catch
  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  // Common validation error handler
  static handleValidationError(err, res) {
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((error) => ({
        field: error.path,
        message: error.message,
      }));
      return this.error(
        res,
        "Validation failed",
        StatusCodes.BAD_REQUEST,
        errors
      );
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      const field = err.errors[0].path;
      return this.error(res, `${field} already exists`, StatusCodes.CONFLICT);
    }

    return this.error(
      res,
      "Internal server error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
