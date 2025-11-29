import Task from "../models/task.model.js";


export const createTask = async (req, res) => {
    const { title, description, dueDate, dueTime } = req.body;

    if (!title || !description || !dueDate || !dueTime) {
        return res.status(400).json("Fill all fields")
    }

    try {
        const newTask = new Task({
            userId: "692352c8877088d9e146274a",
            title,
            description,
            dueDate,
            dueTime
        });

        await newTask.save();
        res.status(201).json({ message: "Task created!" })

    } catch (err) {
        console.log("Error in createTask function in task.controller.js ")
        res.status(500).json({ message: err.message })
    }
}
export const getAllTasks = async (req, res) => {

    try {
        const allTasks = await Task.find({ userId: "692352c8877088d9e146274a" }).select("-__v -userId -createdAt").sort({updatedAt: -1})
        res.status(200).json(allTasks)

    } catch (err) {
        console.log("Error in getAllTasks function in task.controller.js ")
        res.status(500).json({ message: err.message })
    }
}

export const getTaskByStatus = async (req, res) => {
    let { status } = req.params;
    if (status === "overdue") {
        status = "pending"
    }
    const dateToday = new Date().toISOString().split("T")[0];

    try {
        const task = await Task.find({ status }).select("-__v -userId -createdAt").sort({updatedAt: -1});

        // if (status === "overdue" || status === "pending") {
        //     const overdueTasks = [];
        //     const pendingTasks = []

        //     task.map((item) => {
        //         if (item.dueDate < dateToday) {
        //             overdueTasks.push(item)
        //             return res.status(200).json(overdueTasks)
        //         } else {
        //             pendingTasks.push(item)
        //             return res.status(200).json(pendingTasks)
        //         }
        //     })
        // }
        res.status(200).json(task)

    } catch (err) {
        console.log("Error in getTaskByStatus function in task.controller.js", err.message)
        res.status(500).json({ message: err.message })
    }
}
export const getTaskById = async (req, res) => {
    const { id: taskId } = req.params;

    if (!taskId) {
        return res.status(400).json("Provide a task id")
    }

    try {
        const task = await Task.findById(taskId).select("-__v -userId -createdAt -updatedAt");
        res.status(200).json(task)

    } catch (err) {
        console.log("Error in getTaskById function in task.controller.js", err.message)
        res.status(500).json({ message: err.message })
    }
}

export const updateTaskById = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json("Provide a task id")
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        res.status(200).json({ message: "Task updated!" })

    } catch (err) {
        console.log("Error in updateTaskById function in task.controller.js ")
        res.status(500).json({ message: err.message })
    }
}

export const updateTasks = async (req, res) => {
    const status = req.params.status;

    try {
        const updatedTask = await Task.updateMany({ _id: { $in: req.body } }, { $set: { status } });
        res.status(200).json({ message: "Update successful!" })

    } catch (err) {
        console.log("Error in updateTasks function in task.controller.js ")
        res.status(500).json({ message: err.message })
    }
}

export const deleteTask = async (req, res) => {

    try {
        const deletedTasks = await Task.deleteMany({ _id: { $in: req.body } });
        // console.log(deletedTasks.deletedCount)
        res.status(200).json({ message: "Task(s) deleted" })

    } catch (err) {
        console.log("Error in deleteTask function in task.controller.js ")
        res.status(500).json({ message: err.message })
    }
}


