import * as lodash from 'lodash'

type ConfigHelper = (key: string) => string

export const getConfigHelper = (config: { [key: string]: any }): ConfigHelper => (key) => {
    let V = lodash.get(config, key)
    if(V === null) throw new Error("Invalid config value accessed: " + key)
    return V
}