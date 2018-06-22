import {Route} from "../../core/routing/Route"
import {InstanceService} from "../services/InstanceService"
import {validateInstanceRequest} from "./instance-validators"

export const deleteInstanceRoute = (service: InstanceService): Route => ({
    path: '/projects/:projectId/extraction-instances/:instanceId',

    method: 'delete',

    mapper: (req, res) => ({ instanceId: req.params.instanceId, projectId: req.params.projectId }),

    validators: [
        validateInstanceRequest( service )
    ],

    controller: async ({instanceId}) => {
        return service.delete(instanceId)
    }
})