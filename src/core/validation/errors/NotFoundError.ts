import {HTTPError} from "../../errors/HTTPError"

export class NotFoundError extends HTTPError {
    constructor(message) {
        super(message, 404)
    }
}
