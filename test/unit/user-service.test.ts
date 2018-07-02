import {getDBConnection, getInstanceService, getUserService} from "../../src/app"
import {Instance} from "../../src/instances/models/Instance"
import {dummyInstanceParams as instanceParams} from "./instance-service.test"
import {InstanceService} from "../../src/instances/services/InstanceService"
import {UserService} from "../../src/instances/services/UserService"


let instanceService: InstanceService
let service: UserService
let instance: Instance

beforeEach(async () => {
    const connection = await getDBConnection()
    instanceService = getInstanceService(connection)
    service = getUserService(connection)
    instance = await instanceService.create(dummyInstanceParams)
})

afterEach(async () => {
    await instanceService.delete(instance.id)
})

test('user adding and removing', async () => {
    let publications = await service.createMany(instance.id, dummyUsers)
    let retrievedUsers = await service.retrieveByInstance(instance.id)
    expect(retrievedUsers.length).toBe(publications.length)

    let uuids = publications.map(user => user.uuid)
    await service.deleteMany(instance.id, uuids)
    let postDeleteRetrievedUsers = await service.retrieveByInstance(instance.id)
    expect(postDeleteRetrievedUsers.length).toBe(0)

})

const dummyInstanceParams = instanceParams

const dummyUsers = [
    {
        uuid: "testuser1"
    },
    {
        uuid: "testuser2"
    }
]
