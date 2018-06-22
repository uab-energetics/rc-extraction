import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import cors from 'cors'
import {getConfigHelper} from "./core/config/config";
import {getConfig} from "./_config";
import {connectToRabbitMQ} from "./core/messaging/connect";
import {httpErrorHandler} from "./core/errors/httpErrorHandler";
import {connectToDB} from "./core/database/connect";
import {useRoute} from "./core/routing/route-builder";
import {getEventHelper} from "./core/events/event";
import {RouteNotFound} from "./core/errors/RouteNotFound";
import {createInstanceRoute} from "./instances/routes/instances.create"
import {deleteInstanceRoute} from "./instances/routes/instances.delete"
import {updateInstanceRoute} from "./instances/routes/instances.update"
import {retrieveProjectInstancesRoute} from "./instances/routes/instances.retrievebyproject"
import {InstanceService} from "./instances/services/InstanceService"
import {Connection} from "typeorm"
import {Instance} from "./instances/models/Instance"


// load environment and config
dotenv.config({ path: ".env" })
const config = getConfigHelper(getConfig(process.env))

/**
 * COMPOSITION ROOT
 * ========================
 */
export const getApp = async () => {

    // connect to message broker
    let { channel, connection } = await getRabbitMQConnection()

    const dbConn = await getDBConnection()

    // bootstrap express application
    const app = express()
    app.set('port', config('port'))

    // event helper
    const event = getEventHelper({ eventEmitter: app })


    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))

    const instanceService = getInstanceService(dbConn, event)

    useRoute(app, createInstanceRoute(instanceService))
    useRoute(app, retrieveProjectInstancesRoute(instanceService))
    useRoute(app, updateInstanceRoute(instanceService))
    useRoute(app, deleteInstanceRoute(instanceService))

    app.use((req, res, next) => next(new RouteNotFound()))

    app.use(httpErrorHandler)


    return app
}

export const getRabbitMQConnection = async () => {
    return await connectToRabbitMQ({ config })
}

let dbConn = null
export const getDBConnection = async () => {
    if (dbConn === null) {
        // connect to mysql database
        dbConn = await connectToDB({ config })
    }
    return dbConn
}

let service = null
const dummyEventHelper = (data) => {}
export const getInstanceService = (dbConn: Connection, eventHelper = dummyEventHelper): InstanceService => {
    if (service === null) {
        const repository = dbConn.getRepository(Instance)
        service = new InstanceService(repository, eventHelper)
    }
    return service
}
