import {getRepository, Repository} from "typeorm"
import {Instance} from "../models/Instance";
import {instanceCreated, instanceDeleted, instanceUpdated} from "../events/instance-events";

const dummyEventHelper = (data) => {}

export const getInstanceService = (eventHelper = null): InstanceService => {
    return new InstanceService(eventHelper)
}

export class InstanceService {

    readonly repository: Repository<Instance>
    readonly event: (event) => void

    constructor (eventHelper = null) {
        this.repository = getRepository(Instance)
        if (eventHelper === null) {
            eventHelper = dummyEventHelper
        }
        this.event = eventHelper
    }

    async retrieveOne (id: string): Promise<Instance> {
        return await this.repository.findOne(id)
    }

    async retrieveByProject (projectId: string): Promise<Instance[]> {
        return await this.repository.find({projectId})
    }

    async create (params: Object): Promise<Instance> {
        let instance = await this.repository.create(params)
        await this.repository.save(instance)
        this.event(instanceCreated(instance))
        return instance
    }

    async update (id: string, params: Object): Promise<Instance> {
        await this.repository.update(id, params)
        const instance = await this.retrieveOne(id)
        this.event(instanceUpdated(instance))
        return instance
    }

    async delete (id: string): Promise<any> {
        await this.repository.delete(id)
        this.event(instanceDeleted(id))
        return true
    }
}