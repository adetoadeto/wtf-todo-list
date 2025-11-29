import express from "express";
import {createTask, getTaskById, updateTaskById, getTaskByStatus, updateTasks, deleteTask, getAllTasks} from "../controllers/task.controller.js";

const router = express.Router();

// get all tasks (use user Id to get all his tasks)

router.post("/create", createTask)
router.get("/all-tasks", getAllTasks)
router.get("/:id", getTaskById)
router.get("/sort/:status", getTaskByStatus)
router.patch("/update/:id", updateTaskById)
router.patch("/status-update/:status", updateTasks)
router.delete("/delete", deleteTask)

export default router;

