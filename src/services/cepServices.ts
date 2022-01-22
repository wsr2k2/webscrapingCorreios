import puppeteer from "puppeteer";
import {getRepository} from "typeorm";
import { Cep } from '../entity/Cep';

interface IAddress {
  "cep": string;
  "rua": string;
  "bairro": string;
  "cidade_uf": string;
}

class CepService {

  public async consultCEP(cep:string) {
    try {
      const browser = await puppeteer.launch( { headless: true });
      const page = await browser.newPage();
      await page.goto('https://www2.correios.com.br/sistemas/buscacep/buscaEndereco.cfm');

      await page.type('[id="cep"]', ('\s'))
      await page.type('[id="cep"]', cep)
      await page.click('[type="submit"]')
      await page.waitForSelector("td");
      const address = await page.$$eval("td", (element) => element.map((address) => address.textContent));
      await browser.close();

      const formattedAddress: IAddress = {
        cep: address[3],
        rua: address[0],
        bairro: address[1],
        cidade_uf: address[2],
      }
      return formattedAddress;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAddresses() {
    try {
      const addresses = await getRepository(Cep).find();
      return addresses;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAddressByCep(cep: string) {
    try {
      const address = await getRepository(Cep).findOne({ cep: cep })
      return address;
    } catch (error) {
      throw new Error(error);
    }
  }

  // public async saveNewAddress(address: IAddress) {
  //   try {
  //     const addressToSaved = new Cep(address);
  //     addressToSaved.cep = address.cep;
  //     addressToSaved.rua = address.rua;
  //     addressToSaved.bairro = address.bairro;
  //     addressToSaved.cidade_uf = address.cidade_uf;

  //     console.log(addressToSaved)

  //     // const cepResult = await getRepository(Cep).save(addressToSaved);
  //     return {"message": "ok"};
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

}

export default new CepService();