import {PublicationService} from "../../src/instances/services/PublicationService"
import {getDBConnection, getInstanceService, getPublicationService} from "../../src/app"
import {Instance} from "../../src/instances/models/Instance"
import {dummyInstanceParams as instanceParams} from "./instance-service.test"
import {InstanceService} from "../../src/instances/services/InstanceService"


let instanceService: InstanceService
let service: PublicationService
let instance: Instance

beforeEach(async () => {
    const connection = await getDBConnection()
    instanceService = getInstanceService(connection)
    service = getPublicationService(connection)
    instance = await instanceService.create(dummyInstanceParams)
})

afterEach(async () => {
    await instanceService.delete(instance.id)
})

test('publication CRUD', async () => {
    let publications = await service.createMany(instance.id, dummyPubParams)
    let retrievedPubs = await service.retrieveByInstance(instance.id)
    expect(retrievedPubs.length).toBe(publications.length)
    await expect(retrievedPubs[0].instance).resolves.toEqual(instance)

    let pubIds = publications.map(pub => pub.id)

    const newPriority = 1
    let postUpdatePubs = await service.updatePriorities(pubIds, newPriority)
    expect(postUpdatePubs.length).toBe(publications.length)
    expect(postUpdatePubs.every(pub => pub.priority === newPriority)).toBeTruthy()

    await service.deleteMany(instance.id, pubIds)
    let postDeleteRetrievedPubs = await service.retrieveByInstance(instance.id)
    expect(postDeleteRetrievedPubs.length).toBe(0)

})

const dummyInstanceParams = instanceParams

const dummyPubParams = [
    {
        id: 1
    },
    {
        id: 2,
        priority: -1
    }
]
