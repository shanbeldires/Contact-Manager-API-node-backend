import mongoose  from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please fill in your email "],
        minlength: [6, "email should be at least 6 characters"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "please fill in your email "],
        minlength: [6, "email should be at least 6 characters"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please fill in your password "],
        minlength: [6, "password should be at least 6 characters"]
    },
}, {
    timestamps: true
})
const user = mongoose.model("User", userSchema)
export default user;