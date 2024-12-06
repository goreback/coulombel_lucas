import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  filterTasksByDueDate,
} from "../controllers/tasksController";

const router = express.Router();

router.post("/task", createTask);
router.get("/task", getTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
router.get("/task/dueBefore", filterTasksByDueDate);

export default router;
