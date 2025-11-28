import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connDB = async () => {
    try {
        const response = await mongoose.connect(process.env.URL)
        if (response) {
            console.log("MongoDB connected")
        }
    } catch (err) {
        console.log(err)
    }
}

export default connDB;