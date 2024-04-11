import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Logout = (req, res) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax": "none",
        secure: process.env.NODE_ENV === "Development" ? false: true,
    }).json({
        success: true,
        user: req.user,
    });
}

export const Login = async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return res.json({
            success: false,
            message: "Email or password is incorrect!",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({
            success: false,
            message: "Password is incorrect!!",
        });
    }

    // set cookies
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + (3600 * 24 * 2)), // session time expires in 2 days
        sameSite: process.env.NODE_ENV === "Development" ? "lax": "none",
        secure: process.env.NODE_ENV === "Development" ? false: true,
    });

    res.json({
        success: true,
        message: `Welcome back ${user.name}`
    });
}

export const Registration = async (req, res) => {
    const {name, email, password } = req.body;

    let user = await User.findOne({ email });
    // condition 1: if user already exist
    if(user) {
        return res.json({
            success: true,
            message: "User already exixts",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({name, email, password: hashedPassword});

    res.status(201).json({
        success: true,
        message: "New user registration successful!",
    });
}

export const GetMyProfile = (req, res)=> {
    return res.json({
        success: true,
        user: req.user,
    });
}