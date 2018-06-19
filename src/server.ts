import {getApp} from "./app"
import {RabbitMQConnectionError} from "./core/messaging/errors/RabbitMQConnectionError";
import {attemptRun} from "./core/supervisor/attemptRun";
import {DBConnectionError} from "./core/database/errors/DBConnectionError";

export const startServer = async () => {
    let app = await getApp()
    app.listen( app.get('port'), _ => console.log('App running on port ' + app.get('port')))
}

attemptRun({
    func: startServer,
    delayBetweenRetries: 5000,
    maxAttempts: 20,
    whitelistErrors: [
        DBConnectionError,
        RabbitMQConnectionError
    ]
})
