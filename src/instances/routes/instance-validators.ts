import {NotFoundError} from "../../core/validation/errors/NotFoundError"
import {BadRequestError} from "../../core/validation/errors/BadRequestError"
import {InstanceService} from "../services/InstanceService"

export const validateInstanceRequest = (service: InstanceService) => async (req, res, next) => {
    let instance = await service.retrieveOne(req.params.instanceId)

    if (!instance)
        return next(new NotFoundError("Instance not found"))
    if (instance.projectId !== req.params.projectId)
        return next( new BadRequestError("Instance-project mismatch", null) )

    next()
}