import { BaseController } from "./base.controller.js";
import * as authService from "../services/auth.service.js";
import { StatusCodes } from "http-status-codes";

export class AuthController extends BaseController {
  // Apenas para testes / status
  static mainAuth = (req, res) => {
    return res.status(200).json({ message: "Auth API is working." });
  };

  // Login candidato
  static candidateLogin = BaseController.asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.loginCandidate(email, password);
    if (!result.success) {
      return this.error(res, result.message, StatusCodes.UNAUTHORIZED);
    }
    req.session.user = result.user;
    req.session.userType = "candidate";
    return this.success(
      res,
      {
        user: result.user,
        token: result.token,
      },
      "Login successful"
    );
  });

  // Registro candidato
  static candidateRegister = BaseController.asyncHandler(async (req, res) => {
    const userData = req.body;
    const result = await authService.registerCandidate(userData);
    if (!result.success) {
      return this.error(res, result.message, StatusCodes.BAD_REQUEST);
    }
    return this.success(
      res,
      result.user,
      "Registration successful",
      StatusCodes.CREATED
    );
  });

  // Login recrutador
  static recruiterLogin = BaseController.asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.loginRecruiter(email, password);
    if (!result.success) {
      return this.error(res, result.message, StatusCodes.UNAUTHORIZED);
    }
    req.session.user = result.user;
    req.session.userType = "recruiter";
    return this.success(
      res,
      {
        user: result.user,
        token: result.token,
      },
      "Login successful"
    );
  });

  // Registro recrutador
  static recruiterRegister = BaseController.asyncHandler(async (req, res) => {
    const userData = req.body;
    const result = await authService.registerRecruiter(userData);
    if (!result.success) {
      return this.error(res, result.message, StatusCodes.BAD_REQUEST);
    }
    return this.success(
      res,
      result.user,
      "Recruiter registration successful",
      StatusCodes.CREATED
    );
  });

  // Login empresa
  static companyLogin = BaseController.asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.loginCompany(email, password);
    if (!result.success) {
      return this.error(res, result.message, StatusCodes.UNAUTHORIZED);
    }
    req.session.user = result.user;
    req.session.userType = "company";
    return this.success(
      res,
      {
        user: result.user,
        token: result.token,
      },
      "Company login successful"
    );
  });

  // Registro empresa
  static companyRegister = BaseController.asyncHandler(async (req, res) => {
    const companyData = req.body;
    const result = await authService.registerCompany(companyData);
    if (!result.success) {
      return this.error(res, result.message, StatusCodes.BAD_REQUEST);
    }
    return this.success(
      res,
      result.user,
      "Company registration successful",
      StatusCodes.CREATED
    );
  });

  // Dashboard candidato
  static candidateDashboard = BaseController.asyncHandler(async (req, res) => {
    const candidateData = await authService.getCandidateDashboardData(
      req.user.id
    );
    return this.success(res, candidateData, "Candidate dashboard");
  });

  // Dashboard recrutador
  static recruiterDashboard = BaseController.asyncHandler(async (req, res) => {
    const recruiterData = await authService.getRecruiterDashboardData(
      req.user.id
    );
    return this.success(res, recruiterData, "Recruiter dashboard");
  });

  // Dashboard empresa
  static companyDashboard = BaseController.asyncHandler(async (req, res) => {
    const companyData = await authService.getCompanyDashboardData(
      req.user.company_id
    );
    return this.success(res, companyData, "Company dashboard");
  });

  // Logout
  static logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return this.error(
          res,
          "Logout failed",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return res.status(StatusCodes.OK).json({ message: "Logout successful" });
    });
  };
}
