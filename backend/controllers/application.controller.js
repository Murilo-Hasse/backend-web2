// import { StatusCodes } from "http-status-codes";
// import * as applicationService from "../services/application.service.js";
// import { BaseController } from "./base.controller.js";

// export class ApplicationController extends BaseController {
//   // Submit job application
//   static submitApplication = BaseController.asyncHandler(async (req, res) => {
//     const { jobId } = req.params;
//     const applicationData = {
//       ...req.body,
//       candidateId: req.user.id,
//       jobId,
//     };

//     try {
//       const application = await applicationService.createApplication(
//         applicationData
//       );
//       return this.success(
//         res,
//         application,
//         "Application submitted successfully",
//         StatusCodes.CREATED
//       );
//     } catch (err) {
//       return this.handleValidationError(err, res);
//     }
//   });

//   // Get applications for a job (recruiter view)
//   static getJobApplications = BaseController.asyncHandler(async (req, res) => {
//     const { jobId } = req.params;
//     const { status, page = 1, limit = 10 } = req.query;

//     const options = {
//       jobId,
//       status,
//       page: parseInt(page),
//       limit: parseInt(limit),
//     };

//     const applications = await applicationService.getJobApplications(options);
//     return this.success(res, applications);
//   });

//   // Update application status
//   static updateApplicationStatus = BaseController.asyncHandler(async (req, res) => {
//     const { applicationId } = req.params;
//     const { status, notes } = req.body;

//     const application = await applicationService.updateApplicationStatus(
//       applicationId,
//       status,
//       notes,
//       req.user.id
//     );

//     if (!application) {
//       return this.error(res, "Application not found", StatusCodes.NOT_FOUND);
//     }

//     return this.success(
//       res,
//       application,
//       "Application status updated successfully"
//     );
//   });
// }