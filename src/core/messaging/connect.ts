import * as amqp from 'amqplib'
import {RabbitMQConnectionError} from "./errors/RabbitMQConnectionError"


export const connectToRabbitMQ = async ({ config }) => {
    try {
        let user = config('rabbitmq.user')
        let pass = config('rabbitmq.pass')
        let host = config('rabbitmq.host')
        let vhost = config('rabbitmq.vhost')
        let port = config('rabbitmq.port')
        let connection = await amqp.connect(`amqp://${user}:${pass}@${host}:${port}${vhost}`)
        let channel = await connection.createChannel()
        return { channel, connection }
    } catch (e) {
        throw new RabbitMQConnectionError("Failed to connect to RabbitMQ", config('rabbitmq'))
    }
}
