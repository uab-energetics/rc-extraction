import {Route} from "../../core/routing/Route"
import {getInstanceService} from "../services/InstanceService"
import {validateBody} from "../../core/validation/schema"
import {InstanceCreateSchema} from "../models/instance-schemas"


export const createInstanceRoute = ({dbConn, event}): Route => ({
    path: '/projects/:projectId/extraction-instances',

    method: 'post',

    mapper: (req, res) => ({ params: req.body, projectId: req.params.projectId }),

    validators: [
        validateBody(InstanceCreateSchema)
    ],

    controller: async ({params, projectId}) => {
        const service = getInstanceService(event)
        params.projectId = projectId
        return service.create(params)
    }
})