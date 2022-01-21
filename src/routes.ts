import { Router, Request, Response} from "express"

import { getCepId, getCeps, postCeps, removeCep, updateCep } from "./controller/cep.controller"

import { getCeps, postCeps, consultCEP } from "./controller/cep.controller"




const routes = Router()

routes.get("/ceps", getCeps);
routes.get('/cep/:id', getCepId)
routes.post("/cep", postCeps);
routes.put("/cep/:id", updateCep);
routes.delete("/cep/:id", removeCep);
routes.post("/cep/consult", consultCEP);


export default routes;