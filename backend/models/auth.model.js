import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
}, {timestamps: true})

const Auth = mongoose.model("Auth", authSchema);

export default Auth;