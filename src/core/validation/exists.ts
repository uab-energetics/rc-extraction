import {NotFoundError} from "./errors/NotFoundError"

export const validateExists = connection => (reqProp, modelProp, modelRef) => async (req, res, next) => {
    let id = req.body[reqProp]
    if(!id) id = req.params[reqProp]

    let model = await connection.getRepository(modelRef).findOne({ [modelProp]: id })
    if(!model) return next(new NotFoundError("Resource not Found"))
    next()
}
