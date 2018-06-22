import {Route} from "../../core/routing/Route"
import {InstanceService} from "../services/InstanceService"
import {validateInstanceRequest} from "./instance-validators"
import {validateBody} from "../../core/validation/schema"
import {InstanceUpdateSchema} from "../models/instance-schemas"

export const updateInstanceRoute = (service: InstanceService): Route => ({
    path: '/projects/:projectId/extraction-instances/:instanceId',

    method: 'put',

    mapper: (req, res) => ({
        instanceId: req.params.instanceId,
        projectId: req.params.projectId,
        params: req.body
    }),

    validators: [
        validateInstanceRequest( service ),
        validateBody(InstanceUpdateSchema)
    ],

    controller: async ({instanceId, params}) => {
        return service.update(instanceId, params)
    }
})