// import { BaseController } from "./base.controller.js";
// import * as authService from "../services/auth.service.js";

// export class AuthController extends BaseController {
//   // Página principal de autenticação
//   static mainAuth = (req, res) => {
//     res.render("auth/main", { layout: "auth", title: "Login no sistema" });
//   };

//   // Login - formulário de candidato
//   static candidateLoginForm = (req, res) => {
//     res.render("auth/candidate/login", {
//       layout: "auth",
//       title: "Login - Candidato",
//     });
//   };

//   // Login - ação de candidato
//   static candidateLogin = BaseController.asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const result = await authService.loginCandidate(email, password);

//     if (!result.success) {
//       return res.render("auth/candidate/login", {
//         layout: "auth",
//         title: "Login - Candidato",
//         error: result.message,
//       });
//     }

//     req.session.user = result.user;
//     req.session.userType = "candidate";
//     res.redirect("/auth/candidate/dashboard");
//   });

//   // Cadastro - formulário de candidato
//   static candidateRegisterForm = (req, res) => {
//     res.render("auth/candidate/register", {
//       layout: "auth",
//       title: "Cadastro - Candidato",
//     });
//   };

//   // Cadastro - ação de candidato
//   static candidateRegister = BaseController.asyncHandler(async (req, res) => {
//     const userData = req.body;
//     const result = await authService.registerCandidate(userData);

//     if (!result.success) {
//       return res.render("auth/candidate/register", {
//         layout: "auth",
//         title: "Cadastro - Candidato",
//         error: result.message,
//         formData: userData, // para repopular o formulário
//       });
//     }

//     // Cadastro bem-sucedido → redireciona para login
//     res.render("auth/candidate/login", {
//       layout: "auth",
//       title: "Login - Candidato",
//       success: "Cadastro realizado com sucesso! Faça o login abaixo.",
//     });
//   });

//   // Login - formulário de recrutador
//   static recruiterLoginForm = (req, res) => {
//     res.render("auth/recruiter/login", {
//       layout: "auth",
//       title: "Login - Recrutador",
//     });
//   };

//   // Login - ação de recrutador
//   static recruiterLogin = BaseController.asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const result = await authService.loginRecruiter(email, password);

//     if (!result.success) {
//       return res.render("auth/recruiter/login", {
//         layout: "auth",
//         title: "Login - Recrutador",
//         error: result.message,
//       });
//     }

//     req.session.user = result.user;
//     req.session.userType = "recruiter";
//     res.redirect("/auth/recruiter/dashboard");
//   });

//   // Cadastro - formulário de recrutador
//   static recruiterRegisterForm = (req, res) => {
//     res.render("auth/recruiter/register", {
//       layout: "auth",
//       title: "Cadastro - Recrutador",
//     });
//   };

//   // Cadastro - ação de recrutador
//   static recruiterRegister = BaseController.asyncHandler(async (req, res) => {
//     const userData = req.body;
//     const result = await authService.registerRecruiter(userData);

//     if (!result.success) {
//       return res.render("auth/recruiter/register", {
//         layout: "auth",
//         title: "Cadastro - Recrutador",
//         error: result.message,
//         formData: userData,
//       });
//     }

//     res.render("auth/recruiter/login", {
//       layout: "auth",
//       title: "Login - Recrutador",
//       success: "Cadastro realizado com sucesso! Faça o login abaixo.",
//     });
//   });

//   // Dashboard - candidato
//   static candidateDashboard = BaseController.asyncHandler(async (req, res) => {
//     const candidateData = await authService.getCandidateDashboardData(
//       req.session.user.id
//     );
//     res.render("auth/candidate/dashboard", {
//       layout: "auth",
//       title: "Painel do Candidato",
//       user: req.session.user,
//       candidate: candidateData,
//     });
//   });

//   // Dashboard - recrutador
//   static recruiterDashboard = BaseController.asyncHandler(async (req, res) => {
//     const recruiterData = await authService.getRecruiterDashboardData(
//       req.session.user.id
//     );
//     res.render("auth/recruiter/dashboard", {
//       layout: "auth",
//       title: "Painel do Recrutador",
//       user: req.session.user,
//       recruiter: recruiterData,
//     });
//   });

//   // Logout
//   static logout = (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error("Erro ao encerrar a sessão:", err);
//       }
//       res.redirect("/auth");
//     });
//   };
// }
