export class HTTPError extends Error {

    statusCode: number

    constructor(msg: string, statusCode: number) {
        super(msg)
        Error.captureStackTrace(this, this.constructor)
        this.statusCode = statusCode
    }

}