import * as joi from "joi"

export const InstanceCreateSchema = {
    displayName: joi.string().required(),
    description: joi.string(),
    codebookId: joi.string(),
    codebookVersion: joi.string()
}

export const InstanceUpdateSchema = {
    displayName: joi.string(),
    description: joi.string(),
    codebookId: joi.string(),
    codebookVersion: joi.string()
}