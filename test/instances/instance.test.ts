import {getDBConnection} from "../../src/app";
import {getInstanceService} from "../../src/instances/services/InstanceService";

const dummyInstanceParams = {
    projectId: "test-project",
    displayName: "Test Instance",
    description: "jkjk",
    codebookId: "1",
    codebookVersion: "1.0.0"
}

const dummyEvent = (data) => {}


test('instance creation and deletion', async (done) => {
    const connection = await getDBConnection()
    let service = getInstanceService(connection, dummyEvent)


    // create instance
    let instance = await service.create(dummyInstanceParams)
    expect(instance).toBeTruthy()

    // retrieve existing instance
    let retrieved = await service.retrieveOne(instance.id)
    expect(retrieved).toBeTruthy()

    // delete instance
    await service.delete(instance.id)

    // retrieve nonexistent instance
    let postDeleteRetrieved = await service.retrieveOne(instance.id)
    expect(postDeleteRetrieved).toBeFalsy()

    done()
})


test('instance retrieval by project', async (done) => {
    const connection = await getDBConnection()
    let service = getInstanceService(connection, dummyEvent)

    let instances = []

    let proj1Params = {...dummyInstanceParams}
    proj1Params.projectId = 'test-project-1'

    let proj2Params = {...dummyInstanceParams}
    proj2Params.projectId = 'test-project-2'

    // create variable number of instances per project
    instances.push( await service.create(proj1Params) )
    instances.push( await service.create(proj2Params) )
    instances.push( await service.create(proj2Params) )

    const proj1Instances = await service.retrieveByProject('test-project-1')
    expect(proj1Instances.length).toBe(1)

    const proj2Instances = await service.retrieveByProject('test-project-2')
    expect(proj2Instances.length).toBe(2)

    // cleanup
    for (let instance of instances) {
        await service.delete(instance.id)
    }
    done()
})

test('instance updating', async (done) => {
    const connection = await getDBConnection()
    let service = getInstanceService(connection, dummyEvent)

    let instance = await service.create(dummyInstanceParams)
    const newDescription = "new description"
    instance = await service.update(instance.id, {
        description: newDescription
    })

    expect(instance.description).toBe(newDescription)

    await service.delete(instance.id)
    done()
})