import {In, Repository} from "typeorm"
import {InstanceService} from "./InstanceService"
import {User} from "../models/User"
import {FindOptionsUtils} from "typeorm/find-options/FindOptionsUtils"


export class UserService {

    constructor (
        private repository: Repository<User>,
        private event: (event) => void,
        private instanceService: InstanceService
    ) {}

    async createMany(instanceId, params: Object[]): Promise<User[]> {
        let users = params.map( columns => this.repository.create(columns))

        await this.repository.save(users)
        await this.instanceService.addUsers(instanceId, users)

        return users
    }

    async retrieveByInstance(instanceId): Promise<User[]> {
        return await this.instanceService.retrieveUsers(instanceId)
    }

    async deleteMany(instanceId, uuids: string[]) {
        return await this.repository.delete({instance: instanceId, uuid: In(uuids)})
    }

}