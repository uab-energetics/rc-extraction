import * as dotenv from "dotenv";
import program from 'commander'

import {getConfigHelper} from "./core/config/config";
import {getConfig} from "./_config";
import {seedDatabase} from "./core/database/seed";
import {DATABASE} from "./core/database/_seeds";
import {connectToDB} from "./core/database/connect";
import {attemptRun} from "./core/supervisor/attemptRun";
import {DBConnectionError} from "./core/database/errors/DBConnectionError";

const runDatabaseSeed = async () => {
    // Load environment and config
    dotenv.config({ path: ".env" })
    const config = getConfigHelper(getConfig(process.env))

    // Connect to database
    let dbConn = await connectToDB({ config })

    // Setup command line parsing
    program
        .version('1.0.0')
        .option('-c, --clear-tables <shouldClear>', 'Will truncate tables first if set to true')
        .parse(process.argv)

    let clearTables = (program.clearTables == 'true')
    if(clearTables) console.log("truncating tables..")

    // Run script
    seedDatabase({ config, dbConn, clearTables, database: DATABASE }).then( _ => {
        console.log("seeded database", DATABASE)
    })
}

attemptRun({
    func: runDatabaseSeed,
    whitelistErrors: [
        DBConnectionError
    ]
})
