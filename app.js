import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongodb from "./config/mongodb.js";
import { errorHandler } from "./errorHandler/errorHandler.js";
import userRoute from "./route/userRoute.js";
import contactRoute from "./route/contactRoute.js";
mongodb();
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/user", userRoute)
app.use("/api/contact", contactRoute)
app.use(errorHandler)
export default app;