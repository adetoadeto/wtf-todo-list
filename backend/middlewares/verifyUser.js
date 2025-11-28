import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";

const verifyUser = async (req, res, next) => {
    const token = req.headers.cookie?.split("=")[1];

    if(!token) {
        return res.status(401).json({message: "Access Denied"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;

        const user = await Auth.findOne({userId: req.user.id})
        if(!user) {
            return res.status(401).json({msg: "Invalid access"})
        }

        next();
    } catch (err) {
        return res.status(500).json(err.message)
    }

}

export default verifyUser;