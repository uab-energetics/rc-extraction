import {In, Repository} from "typeorm"
import {Publication} from "../models/Publication"
import {InstanceService} from "./InstanceService"


export class PublicationService {

    constructor (
        private repository: Repository<Publication>,
        private event: (event) => void,
        private instanceService: InstanceService
    ) {}

    async createMany(instanceId, params: Object[]): Promise<Publication[]> {
        let pubs = params.map( columns => this.repository.create(columns))

        await this.repository.save(pubs)
        await this.instanceService.addPublications(instanceId, pubs)

        return pubs
    }

    async retrieveMany(ids: number[]): Promise<Publication[]> {
        return await this.repository.findByIds(ids)
    }

    async retrieveByInstance(instanceId): Promise<Publication[]> {
        return await this.repository.find({instance: instanceId})
    }

    async updatePriorities(ids: number[], priority: number): Promise<Publication[]> {
        await this.repository.update(ids, {priority})
        return await this.retrieveMany(ids)
    }

    async deleteMany(instanceId, ids: number[]) {
        return await this.repository.delete({instance: instanceId, id: In(ids)})
    }

}