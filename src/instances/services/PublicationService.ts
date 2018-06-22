import {Repository} from "typeorm"
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

    async retrieveByInstance(instanceId): Promise<Publication[]> {
        return await this.instanceService.retrievePublications(instanceId)
    }

}