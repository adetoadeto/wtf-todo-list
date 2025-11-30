import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Auth from "../models/auth.model.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Fill all fields" })
    }

    const existingUser = await Auth.findOne({ email })
    if (existingUser) {
        return res.status(409).json({ message: "User exists" })
    }

    try {
        const hashedPassword = await bcrypt.hashSync(password, 10)

        const user = new User({
            username
        })
        await user.save()

        const userID = user._id
        const auth = Auth({
            email,
            password: hashedPassword,
            userId: userID
        })
        await auth.save()

        return res.status(201).json({ message: "Account created!" })
    } catch (err) {
        console.log("Error in signUp function in auth.controller.js")
        return res.status(500).json({ message: err.message } || "Server error")
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Fill in all fields"
        });
    }

    const existingUser = await Auth.findOne({ email })
    if (!existingUser) {
        return res.status(400).json({ message: "Incorrect login details" })
    }

    const passwordValid = await bcrypt.compare(password, existingUser.password);
    if (!passwordValid) {
        return res.status(400).json({ message: "Incorrect login details" })
    }

    try {
        const token = jwt.sign({
            id: existingUser.userId
        }, process.env.JWT);

        res.cookie("stored_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        })

        return res.status(200).json({ message: "Login successful!" });
    } catch (err) {
        console.log("Error in login function in auth.controller.js")
        return res.status(500).json({ message: err.message })
    }
}

export const logout = async (req, res) => {
    try {
        // res.setHeader("Cache-Control", "no-store");
        // res.setHeader("Pragma", "no-cache");
        res.clearCookie("stored_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        })
        return res.status(200).json({ message: "Logged out" });
    } catch (err) {
        console.log("Error in logout function in auth.controller.js")
        return res.status(500).json({ message: err.message } || "Server error")
    }
}


