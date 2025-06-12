import { BaseController } from "./base.controller.js";
import * as candidateService from "../services/candidate.service.js";

export class CandidateController extends BaseController {
  // Lista de candidatos com filtros e paginação
  static getAllCandidates = BaseController.asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, skills } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      skills: skills ? skills.split(",") : undefined,
    };

    const result = await candidateService.getAllCandidates(options);

    res.render("candidate/list", {
      layout: "main",
      title: "Lista de Candidatos",
      candidates: result.candidates,
      pagination: result,
      search,
      skills: skills ? skills.split(",") : [],
    });
  });

  // Visualizar perfil do candidato específico
  static getCandidateById = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;

    const candidate = await candidateService.getCandidateById(id);

    if (!candidate) {
      return res.render("errors/404", {
        layout: "main",
        title: "Não encontrado",
        message: "Candidato não encontrado.",
      });
    }

    res.render("candidate/view", {
      layout: "main",
      title: `Perfil de ${candidate.name}`,
      candidate,
    });
  });

  // Atualiza candidato (formulário + ação)
  static editCandidateForm = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const candidate = await candidateService.getCandidateById(id);

    if (!candidate) {
      return res.render("errors/404", {
        layout: "main",
        title: "Não encontrado",
        message: "Candidato não encontrado.",
      });
    }

    res.render("candidate/edit", {
      layout: "main",
      title: "Editar Candidato",
      candidate,
    });
  });

  static updateCandidate = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const candidate = await candidateService.updateCandidate(id, updateData);

      if (!candidate) {
        return res.render("errors/404", {
          layout: "main",
          title: "Não encontrado",
          message: "Candidato não encontrado.",
        });
      }

      res.render("candidate/edit", {
        layout: "main",
        title: "Editar Candidato",
        candidate,
        success: "Candidato atualizado com sucesso!",
      });
    } catch (err) {
      res.render("candidate/edit", {
        layout: "main",
        title: "Editar Candidato",
        error: "Erro ao atualizar: " + (err.message || "Erro inesperado"),
        candidate: { ...updateData, _id: id }, // repopula formulário
      });
    }
  });

  // Deleta candidato
  static deleteCandidate = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleted = await candidateService.deleteCandidate(id);

    if (!deleted) {
      return res.render("errors/404", {
        layout: "main",
        title: "Não encontrado",
        message: "Candidato não encontrado para exclusão.",
      });
    }

    // Redireciona para a lista após a exclusão
    res.redirect("/candidates");
  });

  // Perfil do candidato logado
  static getProfile = BaseController.asyncHandler(async (req, res) => {
    const candidate = await candidateService.getCandidateById(
      req.session.user.id
    );
    res.render("candidate/profile", {
      layout: "main",
      title: "Meu Perfil",
      candidate,
    });
  });

  static updateProfile = BaseController.asyncHandler(async (req, res) => {
    const updateData = req.body;

    try {
      const candidate = await candidateService.updateCandidate(
        req.session.user.id,
        updateData
      );
      res.render("candidate/profile", {
        layout: "main",
        title: "Meu Perfil",
        candidate,
        success: "Perfil atualizado com sucesso!",
      });
    } catch (err) {
      const candidate = await candidateService.getCandidateById(
        req.session.user.id
      );
      res.render("candidate/profile", {
        layout: "main",
        title: "Meu Perfil",
        candidate,
        error:
          "Erro ao atualizar perfil: " + (err.message || "Erro inesperado"),
      });
    }
  });

  // Inscrições do candidato logado
  static getApplications = BaseController.asyncHandler(async (req, res) => {
    const applications = await candidateService.getCandidateApplications(
      req.session.user.id
    );

    res.render("candidate/applications", {
      layout: "main",
      title: "Minhas Inscrições",
      applications,
    });
  });
}
