import { BaseController } from "./base.controller.js";
import * as authService from "../services/auth.service.js";
import { StatusCodes } from "http-status-codes"; 

export class AuthController extends BaseController {
  // Render main authentication page
  static mainAuth = (req, res) => {
    res.render("auth/main");
  };

  // Candidate authentication
  static candidateLoginForm = (req, res) => {
    res.render("auth/candidate/login");
  };

  static candidateLogin = BaseController.asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.loginCandidate(email, password);

    if (!result.success) {
      return this.error(res, result.message, StatusCodes.UNAUTHORIZED);
    }

    // Set session or JWT token
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

  static candidateRegisterForm = (req, res) => {
    res.render("auth/candidate/register");
  };

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

  // Recruiter authentication
  static recruiterLoginForm = (req, res) => {
    res.render("auth/recruiter/login");
  };

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

  // ADICIONADO: Recruiter Register Form
  static recruiterRegisterForm = (req, res) => {
    res.render("auth/recruiter/register"); // Renderiza o formulário de registro para recrutadores
  };

  // ADICIONADO: Recruiter Register
  static recruiterRegister = BaseController.asyncHandler(async (req, res) => {
    const userData = req.body;

    const result = await authService.registerRecruiter(userData); // Chama o serviço para registrar o recrutador

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

  // Dashboard methods
  static candidateDashboard = BaseController.asyncHandler(async (req, res) => {
    const candidateData = await authService.getCandidateDashboardData(
      req.user.id
    );
    res.render("candidate/dashboard", { candidate: candidateData });
  });

  static recruiterDashboard = BaseController.asyncHandler(async (req, res) => {
    const recruiterData = await authService.getRecruiterDashboardData(
      req.user.id
    );
    res.render("recruiter/dashboard", { recruiter: recruiterData });
  });

  // Logout
  static logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return this.error(res, "Logout failed");
      }
      res.redirect("/");
    });
  };
}
