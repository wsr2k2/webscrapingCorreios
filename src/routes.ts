import { Router} from "express"

import CepController from "./controller/cep.controller"

const routes = Router()

routes.get("/ceps", CepController.getAddresses);
routes.get('/cep/search/:cep', CepController.getAddressByCep);
routes.post("/cep", CepController.saveAddress);
routes.put("/cep/:id", CepController.updateCep);
routes.delete("/cep/:id", CepController.removeCep);
routes.post("/cep/consult", CepController.consultCep);


export default routes;