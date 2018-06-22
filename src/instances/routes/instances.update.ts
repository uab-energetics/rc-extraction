import {Route} from "../../core/routing/Route"
import {getInstanceService} from "../services/InstanceService"
import {validateInstanceRequest} from "./instance-validators"
import {validateBody} from "../../core/validation/schema"
import {InstanceUpdateSchema} from "../models/instance-schemas"

export const updateInstanceRoute = ({dbConn, event}): Route => ({
    path: '/projects/:projectId/extraction-instances/:instanceId',

    method: 'put',

    mapper: (req, res) => ({
        instanceId: req.params.instanceId,
        projectId: req.params.projectId,
        params: req.body
    }),

    validators: [
        validateInstanceRequest( getInstanceService(event) ),
        validateBody(InstanceUpdateSchema)
    ],

    controller: async ({instanceId, params}) => {
        const service = getInstanceService(event)
        return service.update(instanceId, params)
    }
})