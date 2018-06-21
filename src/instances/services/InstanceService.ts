import {Connection, Repository} from "typeorm";
import {Instance} from "../models/Instance";

export const getInstanceService = (dbConn: Connection): InstanceService => {
    const repository = dbConn.getRepository(Instance)
    return new InstanceService(repository)
}

export class InstanceService {

    constructor(private repository: Repository<Instance>) {}

    async retrieveOne (id: string): Promise<Instance> {
        return await this.repository.findOne(id)
    }

    async retrieveByProject (projectId: string): Promise<Instance[]> {
        return await this.repository.find({projectId})
    }

    async create (params: Object): Promise<Instance> {
        let instance = await this.repository.create(params)
        await this.repository.save(instance)
        // TODO: emit event
        return instance
    }

    async update (id: string, params: Object): Promise<Instance> {
        await this.repository.update(id, params)
        // TODO: emit event
        return await this.retrieveOne(id)
    }

    async delete (id: string): Promise<any> {
        await this.repository.delete(id)
        // TODO: emit event
    }
}