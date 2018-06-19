
export class DBConnectionError extends Error {

    connectionSettings

    constructor(msg: string, connectionSettings: object) {
        super(msg)
        Error.captureStackTrace(this, this.constructor)
        this.connectionSettings = connectionSettings
    }

}
