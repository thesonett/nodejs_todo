import express from "express";
import userRouter from "./routers/user.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routers/task.js";
import cors from "cors";

export const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// using routers in my app
app.use("/api/v1/", userRouter);
app.use("/api/v1/", taskRouter);

// default
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});