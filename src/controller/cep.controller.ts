import { Request, Response } from "express";
import CepService from '../services/cepServices';

class CepController {

  public async consultCep(request: Request, response:Response) {
    try {
      const { cep } = request.body;
      const address = await CepService.consultCEP(cep);
      return response.send(address);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAddresses(request: Request, response: Response) {
    try {
      const ceps = await CepService.getAddresses();
      return response.json(ceps);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAddressByCep(request: Request, response: Response) {
    try {
      const { cep } = request.params;
      const address = await CepService.getAddressByCep(cep);
      return response.json(address);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async saveAddress(request: Request, response: Response) {
    try {
      const cepResult = await CepService.saveNewAddress(request.body);
      return response.json(cepResult)
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getOrSaveAddress(request: Request, response: Response) {
    try {
      const { cep } = request.body;

      const address = await CepService.getOrSaveAddress(cep);
      return response.json(address);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateAddress(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const address = await CepService.updateAddress(id, request.body);
      return response.json(address);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async removeCep(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const result = await CepService.removeAddress(id);
        return response.json(result)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new CepController();

