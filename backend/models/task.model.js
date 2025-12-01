import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        required: true,
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
        required: true,
    },
    dueDate: {
        required: true,
        type: String,
    },
    dueTime: {
        required: true,
        type: String,
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;