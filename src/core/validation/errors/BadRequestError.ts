import {HTTPError} from "../../errors/HTTPError"

export class BadRequestError extends HTTPError {

    errors: object

    constructor(message, errors) {
        super(message, 400)
        this.errors = errors
    }
}
