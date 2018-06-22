import {getApp} from "../../src/app"

const request = require('supertest')

const dummyInstanceParams = {
    displayName: "Test Instance",
    description: "jkjk",
    codebookId: "1",
    codebookVersion: "1.0.0"
}

test('instances api', async () => {
    const app = await getApp()
    const projectId = 'test-project'

    // creating
    const createRes = await request(app)
        .post(`/projects/${projectId}/extraction-instances`)
        .send(dummyInstanceParams)
    expect(createRes.statusCode).toBe(200)
    const instanceId = createRes.body.id
    expect(instanceId).toBeTruthy()

    // updating
    const updateRes = await request(app)
        .put(`/projects/${projectId}/extraction-instances/${instanceId}`)
        .send({description: "updated description"})
    expect(updateRes.statusCode).toBe(200)
    expect(updateRes.body.description).toBe("updated description")


    // deleting
    const deleteWrongProjectRes = await request(app)
        .delete(`/projects/different-project/extraction-instances/${instanceId}`)
    expect(deleteWrongProjectRes.statusCode).toBe(400)

    const deleteRes = await request(app)
        .delete(`/projects/${projectId}/extraction-instances/${instanceId}`)
    expect(deleteRes.statusCode).toBe(200)

    const deleteNonexistentRes = await request(app)
        .delete(`/projects/${projectId}/extraction-instances/${instanceId}`)
    expect(deleteNonexistentRes.statusCode).toBe(404)


})