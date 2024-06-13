import mongoose from "mongoose";

type ConnectingObject = {
    isConnected?: number,
}

const connection: ConnectingObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODN_URI || "");

        connection.isConnected = db.connections[0].readyState;
        console.log("connection is successfull", db);
    } catch (error) {
        console.log("database connection failed",error)
        process.exit();

    }
}

export default dbConnect