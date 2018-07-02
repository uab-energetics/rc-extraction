import {Repository} from "typeorm"
import {Instance} from "../models/Instance";
import {instanceCreated, instanceDeleted, instanceUpdated} from "../events/instance-events";
import {Publication} from "../models/Publication"
import {User} from "../models/User"


export class InstanceService {

    constructor (
        private repository: Repository<Instance>,
        private event: (event) => void
    ) {}

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

    async addPublications(instanceId, publications: Publication[]) {
        return await this.repository.createQueryBuilder()
            .relation(Instance, 'publications')
            .of(instanceId)
            .add(publications)
    }

    async addUsers(instanceId, users: User[]) {
        return await this.repository.createQueryBuilder()
            .relation(Instance, 'users')
            .of(instanceId)
            .add(users)
    }
}