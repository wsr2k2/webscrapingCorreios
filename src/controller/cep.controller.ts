import {getRepository} from "typeorm";
import { Request, Response } from "express";
import {Cep} from "../entity/Cep";

export const getCeps = async( request: Request, response: Response) => {
    const ceps = await getRepository(Cep).find()
    return response.json(ceps);
}

export const postCeps = async( request: Request, response: Response) => {
    const cep = await getRepository(Cep).save(request.body);
    return response.json(cep)
}