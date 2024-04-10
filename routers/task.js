import express from "express";
import { DeleteTask, GetAllTasks, NewTask, UpdateTask } from "../controllers/task.js";
import { isAuthenticated } from "../utils/auth.js";

const taskRouter = express.Router();

taskRouter.post("/newTask", isAuthenticated, NewTask);
taskRouter.get("/getMyTasks", isAuthenticated, GetAllTasks);
taskRouter.route("/task/:id").put(isAuthenticated, UpdateTask).delete(isAuthenticated, DeleteTask);

export default taskRouter;