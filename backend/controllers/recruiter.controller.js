import * as recruiterService from "../services/recruiter.service.js";

export const createRecruiter = async (req, res) => {
  try {
    const recruiter = await recruiterService.createRecruiter(req.body);
    res.status(201).json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await recruiterService.getAllRecruiters();
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await recruiterService.getRecruiterById(req.params.id);
    if (!recruiter)
      return res.status(404).json({ error: "Recruiter not found" });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRecruiter = async (req, res) => {
  try {
    const recruiter = await recruiterService.updateRecruiter(
      req.params.id,
      req.body
    );
    if (!recruiter)
      return res.status(404).json({ error: "Recruiter not found" });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRecruiter = async (req, res) => {
  try {
    const deleted = await recruiterService.deleteRecruiter(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Recruiter not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
