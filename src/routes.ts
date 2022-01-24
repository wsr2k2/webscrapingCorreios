import { Router} from "express"

import CepController from "./controller/cep.controller"
import { fieldValidation } from './middlewares/fieldValidationMiddleware';

const routes = Router()

routes.post("/cep", fieldValidation, CepController.getOrSaveAddress);
routes.get("/ceps", CepController.getAddresses);
routes.get("/cep/search/:cep", CepController.getAddressByCep);
routes.post("/cep/save", CepController.saveAddress);
routes.put("/cep/:id", CepController.updateAddress);
routes.delete("/cep/:id", CepController.removeCep);
routes.post("/cep/consult", CepController.consultCep);


export default routes;