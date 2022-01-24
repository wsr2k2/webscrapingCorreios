import puppeteer from "puppeteer";
import { getRepository } from "typeorm";
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
      return await getRepository(Cep).find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAddressByCep(cep: string) {
    try {
      const address = await getRepository(Cep).find({ cep: cep });
      return address;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async saveNewAddress(address: IAddress) {
    try {
      console.log(address)
      const cepEntity = new Cep();
      cepEntity.cep = address.cep;
      cepEntity.rua = address.rua;
      cepEntity.bairro = address.bairro;
      cepEntity.cidade_uf = address.cidade_uf

      return await getRepository(Cep).save(cepEntity);
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new CepService();