import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const url = process.env.MONGODB_URL
const mongodb = async () => {
    try {
        const connect = await mongoose.connect(url);
        console.log("mongo db connected", connect.connection.host,connect.connection.name)
    } catch (error) {
        console.log("error has occured in mongo db", error);
        process.exit(1)
    }
}
export default mongodb;