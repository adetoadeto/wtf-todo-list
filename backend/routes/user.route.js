import express from "express";
import {getAllUsers, getUserById, updateUserById, deleteUserById} from "../controllers/user.controller.js";
import verifyUser from "../middlewares/verifyUser.js"
const router = express.Router();

router.get("/all", getAllUsers)
router.get("/user-id", getUserById)
router.patch("/update-user",verifyUser, updateUserById)
router.delete("/delete-user", deleteUserById)

export default router;

