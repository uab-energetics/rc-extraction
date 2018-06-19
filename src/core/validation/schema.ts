import {BadRequestError} from "./errors/BadRequestError"

const Joi = require('joi')

export const validateBody = (schema) => async (req, res, next) => {
    const result = Joi.validate(req.body, schema, {
        allowUnknown: true
    })
    if(result.error)
        return next(new BadRequestError("Invalid request params", result.error))
    next()
}