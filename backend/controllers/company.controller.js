// import * as companyService from "../services/company.service.js";
// import { StatusCodes } from "http-status-codes";

// export const createCompany = async (req, res) => {
//   try {
//     const company = await companyService.createCompany(req.body);
//     res.status(StatusCodes.CREATED).json(company);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const getAllCompanies = async (req, res) => {
//   try {
//     const companies = await companyService.getAllCompanies();
//     res.json(companies);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const getCompanyById = async (req, res) => {
//   try {
//     const company = await companyService.getCompanyById(req.params.id);
//     if (!company) return res.status(StatusCodes.NOT_FOUND).json({ error: "Company not found" });
//     res.json(company);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const updateCompany = async (req, res) => {
//   try {
//     const company = await companyService.updateCompany(req.params.id, req.body);
//     if (!company) return res.status(StatusCodes.NOT_FOUND).json({ error: "Company not found" });
//     res.json(company);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const deleteCompany = async (req, res) => {
//   try {
//     const deleted = await companyService.deleteCompany(req.params.id);
//     if (!deleted) return res.status(StatusCodes.NOT_FOUND).json({ error: "Company not found" });
//     res.status(StatusCodes.NO_CONTENT).send();
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };
