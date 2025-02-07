import mongoose from "mongoose";

export async function connect() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        mongoose.connect(mongoUri);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongDB connected successfully");
        })

        connection.on('error', (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something goes wrong");
        console.log(error);
    }
}