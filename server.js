import { app } from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./database/database.js";

// using middlewares
config({
    path: "./utils/config.env",
});

// database connection
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port number: ${process.env.PORT} in ${process.env.NODE_ENV} mode!`);
});