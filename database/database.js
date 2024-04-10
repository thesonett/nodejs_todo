import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "todo_backend",
    }).then(c => console.log("Database connected!")).catch(err => console.log(err));
}