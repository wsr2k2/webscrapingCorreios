import { Router} from "express"

import { getCepId, getAddresses,  removeCep, updateCep, consultCEP } from "./controller/cep.controller"

const routes = Router()

routes.get("/ceps", getAddresses);
routes.get('/cep/:id', getCepId)
// routes.post("/cep", postCeps);
routes.put("/cep/:id", updateCep);
routes.delete("/cep/:id", removeCep);
routes.post("/cep/consult", consultCEP);


export default routes;