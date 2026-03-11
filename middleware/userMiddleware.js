import joi from "joi"
const userValidation = joi.object({
    username: joi.string().required().min(6),
    email: joi.string().email().required().min(6),
    password: joi.string().required().min(6),
})
export default userValidation;