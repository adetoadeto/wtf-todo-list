import User from "../models/user.model.js";
import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)

    } catch (err) {
        console.log("Error in getAllUsers function in user.controller.js ")
        res.status(500).json({ message: err.message })
    }
}

export const getUserById = async (req, res) => {
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json("Provide a user id")
    }

    try {
        const user = await User.findById(userId);
        res.status(200).json(user)

    } catch (err) {
        console.log("Error in getUserById function in user.controller.js ")
        res.status(500).json({ message: err.message })
    }
}

export const updateUserById = async (req, res) => {

    const userId = req.user.id
    const { username, password } = req.body;

    try {
        if (password) {
            const hashedPassword = await bcrypt.hashSync(password, 10)
            const update = await Auth.findOneAndUpdate({userId}, {password: hashedPassword }, { new: true });
        }
        if (username) {
            const updatedUser = await User.findByIdAndUpdate(userId, { username }, { new: true });
        }
        res.status(200).json({message: "Updated!"})

    } catch (err) {
        console.log("Error in updateUserById function in task.controller.js ")
        res.status(500).json({ message: err.message })
    }
}

export const deleteUserById = async (req, res) => {
    const userId = req.body.id

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted" }, deletedUser)

    } catch (err) {
        console.log("Error in deleteUserById function in user.controller.js ")
        res.status(500).json({ message: err.message })
    }
}


