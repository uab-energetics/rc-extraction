import {HTTPError} from "./HTTPError";

export class RouteNotFound extends HTTPError {
    constructor() {
        super("This is not the route you're looking for", 404)
    }

}