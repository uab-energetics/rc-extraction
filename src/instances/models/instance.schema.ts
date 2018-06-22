import * as joi from "joi"

export const InstanceSchema = {
    displayName: joi.string().required(),
    description: joi.string(),
    codebookId: joi.string(),
    codebookVersion: joi.string()
}