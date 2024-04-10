import express from "express";
import { Login, Logout, Registration, GetMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../utils/auth.js";

const userRouter = express.Router();

userRouter.get("/myProfile", isAuthenticated, GetMyProfile);

userRouter.post("/register", Registration);
userRouter.post("/login", Login);
userRouter.get("/logout", Logout);

export default userRouter;