const Joi = require('joi')

const registerUserValidation = Joi.object({
    email: Joi.string().max(50).required(),
    name: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
})

const loginUserValidation = Joi.object({
    email: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
})

module.exports = {
    registerUserValidation,
    loginUserValidation
}