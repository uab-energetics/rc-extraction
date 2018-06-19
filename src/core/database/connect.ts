import {createConnection} from "typeorm";
import {ENTITIES} from "./_entities";
import {DBConnectionError} from "./errors/DBConnectionError";


export const connectToDB = async ({ config }) => {
    try {
        return await createConnection({
            type: "mysql",
            host: config('mysql.host'),
            port: 3306,
            username: config('mysql.user'),
            password: config('mysql.pass'),
            database: config('mysql.database'),
            entities: ENTITIES,
            synchronize: true,
            logging: false
        })
    } catch (e) {
        throw new DBConnectionError("Failed to connect to MySQL", config('mysql'))
    }
}
