import {HTTPError} from "./HTTPError";
import {RouteNotFound} from "./RouteNotFound";
import {BadRequestError} from "../validation/errors/BadRequestError";

export const httpErrorHandler = (err, req, res, next) => {

    if (err instanceof BadRequestError) {
        res.status(err.statusCode).json({
            msg: err.message,
            errors: err.errors
        })
    } else if (err instanceof HTTPError) {
        res.status(err.statusCode).json({
            msg: err.message,
            trace: err.stack
        })
    } else if (err instanceof RouteNotFound) {
        res.status(err.statusCode).json({
            msg: err.message,
            path: req.pathname
        })
    } else {
        res.status(500).json({
            msg: err.message,
            trace: err.stack
        })
    }
}