import {AppEvent} from "../../core/events/AppEvent";
import {Instance} from "../models/Instance";

export const INSTANCE_CREATED = 'instance.created'
export const INSTANCE_UPDATED = 'instance.updated'
export const INSTANCE_DELETED = 'instance.deleted'

export const instanceCreated = (instance): AppEvent<Instance> => ({
    type: INSTANCE_CREATED,
    payload: instance
})

export const instanceUpdated = (instance): AppEvent<Instance> => ({
    type: INSTANCE_UPDATED,
    payload: instance
})

export const instanceDeleted = (instanceId): AppEvent<InstanceDeleted> => ({
    type: INSTANCE_DELETED,
    payload: {instanceId}
})


export interface InstanceDeleted {
    instanceId: string
}