import {getRepository} from "typeorm";
import { Request, Response } from "express";
import {Cep} from "../entity/Cep";
import CepService from '../services/cepServices';

export const getAddresses = async( request: Request, response: Response) => {
  try {
    const ceps = await CepService.getAddresses();
    return response.json(ceps);
  } catch (error) {
    throw new Error(error);
  }
}

export const getCepId = async (request: Request, response: Response) => {
    const { id } = request.body
    const cep = await getRepository(Cep).findOne({ id })
    return response.json(cep);
}

export const getAddressByCep = async (request: Request, response: Response) => {
  const { cep } = request.body;
  console.log(cep)
  const address = await CepService.getAddressByCep(cep);
  return response.json(address);
}

export const postCeps = async( request: Request, response: Response) => {
    if(!request.body.cep) {
        response.status(400).json({ message: "O cep deve ser preenchido"})
        return;
    } if(request.body.cep.length != 8) {
        response.status(400).json({ message: "O Cep deve conter 8 digitos"})
        return
    }
    try {
      const cepResult = await CepService.saveNewAddress(request.body);
      return response.json(cepResult)
    } catch (error) {
      throw new Error(error);
    }
}

export const updateCep = async (request: Request, response: Response) => {
    const { id } = request.params;

    const cep = await getRepository(Cep).update(id, request.body)
    if(cep.affected === 1) {
        const cepUpdate = await getRepository(Cep).findOne(id)
        return response.json(cepUpdate)
    }
}

export const removeCep = async (request: Request, response: Response) => {
    const { id } = request.params;
    const cep = await getRepository(Cep).delete(id)

    if(cep.affected === 1) {
        const cepUpdate = await getRepository(Cep).findOne(id)
        return response.json({ messagem: "Cep removido"})
    }
}

export const consultCEP = async(request: Request, response:Response) => {
  const { cep } = request.body;
  const address = await CepService.consultCEP(cep);
  return response.send(address);
}

