import {Handler, NextFunction, Request, Response} from "express";

export interface Route {
    name?: string
    method: 'post' | 'put' | 'delete' | 'get'
    path: string
    validators?: Handler[]
    mapper?: (req: Request, res: Response, next: NextFunction) => object
    controller: (object) => Promise<object>
}
