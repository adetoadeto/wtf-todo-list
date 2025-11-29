import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import taskRoute from "./routes/task.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import connDB from "./utils/connDB.js";

connDB();

dotenv.config();
const PORT = process.env.PORT;

const app = express();

const allowedOrigins = [
    "http://127.0.0.1:5500",
    "https://todo-app-pgyr.onrender.com"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json())
app.use("/api/task", taskRoute)
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, ()=> {
    console.log("Server running on", PORT)
})
