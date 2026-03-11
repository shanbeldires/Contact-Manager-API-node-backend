import mongoose from "mongoose"
const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "please fill in your name "],
        minlength: [6, "name should be at least 6 characters"]
    },
    email: {
        type: String,
        required: [true, "please fill in your email"],
        minlength: [6, "email should be at least 6 characters"],
        unique: true
    },
    adress: {
        type: String,
        required: [true, "please fill in your adress "],
        minlength: [6, "adress should be at least 6 characters"]
    },
    phone: {
        type: String,
        required: [true, "please fill in your phone number "],
        minlength: [10, "phone should be at least 10 characters"],
        unique: true
    }
}, {
    timestamps: true
})
const contact = mongoose.model("Contact", contactSchema)
export default contact;