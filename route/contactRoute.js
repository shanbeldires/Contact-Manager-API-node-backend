import express from "express"
import { getContact, getContactById, createContact, updateById, deleteById } from "../controller/contactController.js"
import verifyToken from "../middleware/jwt.js"
const contactRoute = express.Router()
contactRoute.use(verifyToken)
contactRoute.get("/", getContact)
contactRoute.get("/:id", getContactById)
contactRoute.post("/", createContact)
contactRoute.put("/:id", updateById)
contactRoute.delete("/:id", deleteById)
export default contactRoute;