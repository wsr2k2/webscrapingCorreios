import puppeteer from "puppeteer";
import {getRepository} from "typeorm";


class CepService {

  public async consultCEP(cep:string) {

    const browser = await puppeteer.launch( { headless: false });
    const page = await browser.newPage();
    await page.goto('https://www2.correios.com.br/sistemas/buscacep/buscaEndereco.cfm');
    await page.type('[id="cep"]', ('\s'))
    await page.type('[id="cep"]', cep)
    await page.click('[type="submit"]')

    const sel = "td";
    await page.waitForNavigation();
    const address = await page.evaluate((sel) => {
      const array = Array.from(document.querySelectorAll(sel))

      return array
    })
    // const addressComplete = [...address];


    console.log('address', address);



    // await browser.close();

  }

}

export default new CepService();