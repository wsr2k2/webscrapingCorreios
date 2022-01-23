import { Router} from "express"

import { getCepId, getAddresses, postCeps, removeCep, updateCep, consultCEP, getAddressByCep } from "./controller/cep.controller"

const routes = Router()

routes.get("/ceps", getAddresses);
routes.get('/cep/:id', getCepId)
routes.get('/cep/search', getAddressByCep)
routes.post("/cep", postCeps);
routes.put("/cep/:id", updateCep);
routes.delete("/cep/:id", removeCep);
routes.post("/cep/consult", consultCEP);


export default routes;