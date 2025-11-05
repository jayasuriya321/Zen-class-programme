// backend/routes/zenRoutes.js
import express from "express";
import {
  getOctoberTopicsAndTasks,
  getOctoberCompanyDrives,
  getCompanyDrivesWithStudents,
  getCodekataStats,
  getMentorsWithMoreThan15,
  getAbsentAndNotSubmitted,
} from "../controllers/zenController.js";

const router = express.Router();

router.get("/topics-tasks-october", getOctoberTopicsAndTasks);
router.get("/company-drives-october", getOctoberCompanyDrives);
router.get("/company-drives-students", getCompanyDrivesWithStudents);
router.get("/codekata-stats", getCodekataStats);
router.get("/mentors-morethan15", getMentorsWithMoreThan15);
router.get("/absent-not-submitted", getAbsentAndNotSubmitted);

export default router;
