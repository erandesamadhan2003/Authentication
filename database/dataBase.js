import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

export const connectToDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error);
        process.exit(1);
    }
};