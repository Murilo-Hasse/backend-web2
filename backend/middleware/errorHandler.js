// middleware/errorHandler.js
import { StatusCodes } from "http-status-codes";

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Sequelize errors
  if (err.name === "SequelizeValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Validation error",
      details: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(StatusCodes.CONFLICT).json({
      error: "Duplicate entry",
      details: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Invalid reference",
      message: "Referenced record does not exist",
    });
  }

  // Default error
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { details: err.message }),
  });
};

export const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.path}`,
  });
};
