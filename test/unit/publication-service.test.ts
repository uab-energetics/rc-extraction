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

test('publication adding and removing', async () => {
    let publications = await service.createMany(instance.id, dummyPubParams)
    let retrievedPubs = await service.retrieveByInstance(instance.id)
    expect(retrievedPubs.length).toBe(publications.length)

    let pubIds = publications.map(pub => pub.id)
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
