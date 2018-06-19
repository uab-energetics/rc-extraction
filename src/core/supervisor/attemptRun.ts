import {DBConnectionError} from "../database/errors/DBConnectionError";

export interface RunParams {
    func: () => Promise<any>
    maxAttempts?: number
    delayBetweenRetries?: number
    whitelistErrors?: any
}

const defaults: RunParams = {
    func: async () => {},
    delayBetweenRetries: 5000,
    maxAttempts: 25,
    whitelistErrors: [
        DBConnectionError
    ]
}

export const attemptRun = async (runParams: RunParams) => {
    let _runParams: RunParams = { ...defaults, ...runParams }
    let {func, maxAttempts, delayBetweenRetries, whitelistErrors} = _runParams

    let attempts = maxAttempts

    let wrapper = async () => {

        let retry = (e) => {
            console.error(e)
            if(attempts === 0)
                return console.error("Max retry attempts exceeded. Halting.")
            setTimeout(wrapper, delayBetweenRetries)
            attempts -= 1
            console.log(`Retrying in ${delayBetweenRetries / 1000} seconds. ${attempts} attempts left.`)
        }

        try {
            await func()
        } catch (e) {
            for(let err of whitelistErrors)
                if (e instanceof err)
                    return retry(e)
            console.error("Non-temporary error encountered. Not retrying", e)
        }
    }

    await wrapper()
}