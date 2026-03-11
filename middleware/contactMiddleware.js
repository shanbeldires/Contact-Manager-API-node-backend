import joi from "joi"
const contactValidation = joi.object({
    name: joi.string().required().min(6),
    email: joi.string().email().required().min(6),
    adress: joi.string().required().min(6),
    phone: joi.string().min(10).required(),
})
export default contactValidation;
