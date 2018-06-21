import {getConnection, getRepository} from "typeorm";
import {Instance} from "../models/Instance";

const dbConn = getConnection()

export let getNextPublications = (instanceID, ) => {

}

let getPaperQuery = (instanceID, ) => {
    dbConn.createQueryBuilder()
        .relation(Instance, "publications")
        .of(instanceID)
}