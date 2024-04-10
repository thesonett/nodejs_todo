import { Task } from "../models/task.js";

export const NewTask = async (req, res) => {
    const {title, description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(201).json({
        success: true,
        message: "Task Added Successfully",
    });
}

export const GetAllTasks = async (req, res) => {
    const userId = req.user._id;

    const tasks = await Task.find({ user:userId });

    res.status(201).json({
        success: true,
        tasks,
    });
}

export const UpdateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id:id });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(201).json({
        success: true,
        message: "Task Updated Succesfully!",
    });
}

export const DeleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id:id });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    await task.deleteOne();

    res.status(201).json({
        success: true,
        message: "Task Deleted Succesfully!",
    });
}