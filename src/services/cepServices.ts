import puppeteer from "puppeteer";

export const puppeteerResponse = (async (cep: string) => {

  const browser = await puppeteer.launch( { headless: false});
  const page = await browser.newPage();
  await page.goto('https://www2.correios.com.br/sistemas/buscacep/buscaEndereco.cfm');


  await page.type('[id="cep"]', ('\s'))

  await page.type('[id="cep"]', cep)

  await page.click('[type="submit"]')
})


// /\b/