import {Route} from "../../core/routing/Route"
import {InstanceService} from "../services/InstanceService"

export const retrieveProjectInstancesRoute = (service: InstanceService): Route => ({

    path: '/projects/:projectId/extraction-instances',

    method: 'get',

    mapper: (req, res) => ({ projectId: req.params.projectId }),

    validators: [],

    controller: async ({projectId}) => {
        return service.retrieveByProject(projectId)
    }
})