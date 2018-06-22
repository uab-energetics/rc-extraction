import {Route} from "../../core/routing/Route"
import {getInstanceService} from "../services/InstanceService"

export const retrieveProjectInstancesRoute = ({dbConn, event}): Route => ({

    path: '/projects/:projectId/extraction-instances',

    method: 'get',

    mapper: (req, res) => ({ projectId: req.params.projectId }),

    validators: [],

    controller: async ({projectId}) => {
        const service = getInstanceService(event)
        return service.retrieveByProject(projectId)
    }
})