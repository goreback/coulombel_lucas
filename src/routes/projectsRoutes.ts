import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  completeProject,
  filterProjectsByStatus,
} from "../controllers/projectsController";

const router = express.Router();

router.post("/projects", createProject);
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
router.post("/projects/:id/complete", completeProject);
router.get("/projects/status", filterProjectsByStatus);

export default router;
