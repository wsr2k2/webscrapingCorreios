import {getRepository} from "typeorm";
import { Request, Response } from "express";
import {Cep} from "../entity/Cep";
import CepService from '../services/cepServices';

export const getCeps = async( request: Request, response: Response) => {
    const ceps = await getRepository(Cep).find()
    return response.json(ceps);
}

export const postCeps = async( request: Request, response: Response) => {
    const cepResult = await getRepository(Cep).save(request.body);
    const { cep } = request.body;
    // puppeteerResponse(cep);
    return response.json(cepResult)
}

export const consultCEP = async(request: Request, response:Response) => {
  const { cep } = request.body;
  await CepService.consultCEP(cep);
}