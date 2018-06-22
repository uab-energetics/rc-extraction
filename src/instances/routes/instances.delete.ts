import {Route} from "../../core/routing/Route"
import {getInstanceService} from "../services/InstanceService"
import {validateInstanceRequest} from "./instance-validators"

export const deleteInstanceRoute = ({dbConn, event}): Route => ({
    path: '/projects/:projectId/extraction-instances/:instanceId',

    method: 'delete',

    mapper: (req, res) => ({ instanceId: req.params.instanceId, projectId: req.params.projectId }),

    validators: [
        validateInstanceRequest( getInstanceService(event) )
    ],

    controller: async ({instanceId}) => {
        const service = getInstanceService(event)
        return service.delete(instanceId)
    }
})