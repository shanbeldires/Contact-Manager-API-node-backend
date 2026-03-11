import user from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userValidation from "../middleware/userMiddleware.js"

export const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const { error } = userValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const findUser = await user.findOne({ $or: [{ email }, { username }] });
        if (findUser) {
            return res.status(400).json({
                message: "user already exist"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new user({ email, password: hashpassword, username });
        const saveUser = await newUser.save();
        return res.status(201).json({
            data: "user created",
            body: saveUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const currentUser = async (req, res) => {
    try {
        const getCurrentUser = await user.find();
        if (!getCurrentUser || getCurrentUser.length === 0) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        return res.status(200).json({
            data: getCurrentUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            })
        }
        const users = await user.findOne({ email });

        if (users && await bcrypt.compare(password, users.password)) {
            const accessToken = jwt.sign({
                    id: users._id,
                    email: users.email
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "30m"
                }
            )
            return res.status(200).json({
                data: "login successful",
                accessToken
            })
        } else {
            return res.status(400).json({
                message: "password or email is not valid"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}