import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Authentication middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Access token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: "Invalid or expired token",
      });
    }
    req.user = user;
    next();
  });
};

// Role-based middleware
export const isCandidate = (req, res, next) => {
  if (req.user && req.user.role === "candidate") {
    next();
  } else {
    return res.status(StatusCodes.FORBIDDEN).json({
      error: "Access denied. Candidate role required.",
    });
  }
};

export const isRecruiter = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    return res.status(StatusCodes.FORBIDDEN).json({
      error: "Access denied. Recruiter role required.",
    });
  }
};

// Input validation middleware
export const validateCandidateInput = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Name, email, and password are required.",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Please provide a valid email address.",
    });
  }

  // Password validation
  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Password must be at least 6 characters long.",
    });
  }

  next();
};

// Rate limiting middleware
export const rateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const requestData = requests.get(ip);

    if (now > requestData.resetTime) {
      requestData.count = 1;
      requestData.resetTime = now + windowMs;
      return next();
    }

    if (requestData.count >= maxRequests) {
      return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
        error: "Too many requests. Please try again later.",
      });
    }

    requestData.count++;
    next();
  };
};

// Logging middleware
export const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`
  );
  next();
};
