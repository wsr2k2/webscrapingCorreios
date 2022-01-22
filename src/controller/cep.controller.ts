import {getRepository} from "typeorm";
import { Request, Response } from "express";
import {Cep} from "../entity/Cep";
import CepService from '../services/cepServices';

export const getAddresses = async( request: Request, response: Response) => {
    const ceps = await CepService.getAddresses();
    return response.json(ceps);
}

export const getCepId = async (request: Request, response: Response) => {
    const { id } = request.body
    const cep = await getRepository(Cep).findOne({ id })
    return response.json(cep);
}

// export const postCeps = async( request: Request, response: Response) => {
//     if(!request.body.cep) {
//         response.status(400).json({ message: "O cep deve ser preenchido"})
//         return;
//     } if(request.body.cep.length != 8) {
//         response.status(400).json({ message: "O Cep deve conter 8 digitos"})
//         return
//     }
//     const { cep } = request.body;
//     const cepResult = await CepService.saveNewAddress(cep);

//     return response.json(cepResult)
// }

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


    // puppeteerResponse(cep);
    // return response.json(cepResult)
}

export const consultCEP = async(request: Request, response:Response) => {
  const { cep } = request.body;
  const address = await CepService.consultCEP(cep);
  return response.send(address);
}

