import express from "express"
import  verifyToken  from "../middleware/jwt.js"
import {currentUser,loginUser,registerUser} from "../controller/userController.js"
const userRoute=express.Router()
userRoute.get("/current",verifyToken,currentUser)
userRoute.post("/login",loginUser)
userRoute.post("/register",registerUser)
export default userRoute;