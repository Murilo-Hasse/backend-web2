// import { BaseController } from "./base.controller.js";
// import * as recruiterService from "../services/recruiter.service.js";

// export class RecruiterController extends BaseController {
//   // Lista de recrutadores
//   static getAllRecruiters = BaseController.asyncHandler(async (req, res) => {
//     const { page = 1, limit = 10, company } = req.query;

//     const options = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       company,
//     };

//     const result = await recruiterService.getAllRecruiters(options);

//     res.render("recruiter/list", {
//       layout: "main",
//       title: "Lista de Recrutadores",
//       recruiters: result.recruiters,
//       pagination: result,
//       company,
//     });
//   });

//   // Visualizar perfil de um recrutador
//   static getRecruiterById = BaseController.asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const recruiter = await recruiterService.getRecruiterById(id);

//     if (!recruiter) {
//       return res.render("errors/404", {
//         layout: "main",
//         title: "Não encontrado",
//         message: "Recrutador não encontrado.",
//       });
//     }

//     res.render("recruiter/view", {
//       layout: "main",
//       title: `Perfil de ${recruiter.name}`,
//       recruiter,
//     });
//   });

//   // Editar recrutador (formulário + ação)
//   static editRecruiterForm = BaseController.asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const recruiter = await recruiterService.getRecruiterById(id);

//     if (!recruiter) {
//       return res.render("errors/404", {
//         layout: "main",
//         title: "Não encontrado",
//         message: "Recrutador não encontrado.",
//       });
//     }

//     res.render("recruiter/edit", {
//       layout: "main",
//       title: "Editar Recrutador",
//       recruiter,
//     });
//   });

//   static updateRecruiter = BaseController.asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body;

//     try {
//       const recruiter = await recruiterService.updateRecruiter(id, updateData);

//       if (!recruiter) {
//         return res.render("errors/404", {
//           layout: "main",
//           title: "Não encontrado",
//           message: "Recrutador não encontrado.",
//         });
//       }

//       res.render("recruiter/edit", {
//         layout: "main",
//         title: "Editar Recrutador",
//         recruiter,
//         success: "Recrutador atualizado com sucesso!",
//       });
//     } catch (err) {
//       res.render("recruiter/edit", {
//         layout: "main",
//         title: "Editar Recrutador",
//         error: "Erro ao atualizar: " + (err.message || "Erro inesperado"),
//         recruiter: { ...updateData, _id: id },
//       });
//     }
//   });

//   // Deleta recrutador
//   static deleteRecruiter = BaseController.asyncHandler(async (req, res) => {
//     const { id } = req.params;

//     const deleted = await recruiterService.deleteRecruiter(id);

//     if (!deleted) {
//       return res.render("errors/404", {
//         layout: "main",
//         title: "Não encontrado",
//         message: "Recrutador não encontrado para exclusão.",
//       });
//     }

//     // Redireciona para a lista após a exclusão
//     res.redirect("/recruiters");
//   });

//   // Vagas do recrutador logado
//   static getJobPostings = BaseController.asyncHandler(async (req, res) => {
//     const jobs = await recruiterService.getRecruiterJobs(req.session.user.id);

//     res.render("recruiter/jobs", {
//       layout: "main",
//       title: "Minhas Vagas",
//       jobs,
//     });
//   });
// }
