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

    // create
    const createRes = await request(app)
        .post('/projects/test-project/extraction-instances')
        .send(dummyInstanceParams)
    expect(createRes.statusCode).toBe(200)
    const instanceId = createRes.body.id
    expect(instanceId).toBeTruthy()


})