import express from "express";
import {createTask, getTaskById, updateTaskById, getTaskByStatus, updateTasks, deleteTask, getAllTasks} from "../controllers/task.controller.js";

import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

// get all tasks (use user Id to get all his tasks)

router.post("/create", verifyUser, createTask)
router.get("/all-tasks", verifyUser, getAllTasks)
router.get("/:id", verifyUser, getTaskById)
router.get("/sort/:status", verifyUser, getTaskByStatus)
router.patch("/update/:id", verifyUser, updateTaskById)
router.patch("/status-update/:status", verifyUser, updateTasks)
router.delete("/delete", verifyUser, deleteTask)

export default router;

