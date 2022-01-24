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

      const formattedCep = address.cep.normalize("NFD").replace('-', '');
      const cepEntity = new Cep();
      cepEntity.cep = formattedCep;
      cepEntity.rua = address.rua;
      cepEntity.bairro = address.bairro;
      cepEntity.cidade_uf = address.cidade_uf

      return await getRepository(Cep).save(cepEntity);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getOrSaveAddress(cep: string) {
    try {
      const dbAddress = await this.getAddressByCep(cep);
      if (dbAddress.length > 0 ) {
        return ({ dbAddress: dbAddress });
      } else {
        const newAddress = await this.consultCEP(cep);
        const savedAddress = await this.saveNewAddress(newAddress);
        return ({ newAddress: savedAddress });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateAddress(id: string, address: IAddress) {
    const cep = await getRepository(Cep).update(id, address)
      if(cep.affected === 1) {
          const cepUpdate = await getRepository(Cep).findOne(id)
          return (cepUpdate)
      }
  }

  public async removeAddress(id: string) {
    try {
      const address = await getRepository(Cep).delete(id)

      if(address.affected === 1) {
          const cepUpdate = await getRepository(Cep).findOne(id)
          return ({ messagem: "Cep removido"})
      }
    } catch (error) {
      throw new Error(error)
    }
  }

}

export default new CepService();