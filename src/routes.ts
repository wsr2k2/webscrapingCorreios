import { Router, Request, Response} from "express"
import { getCeps, postCeps, consultCEP } from "./controller/cep.controller"



const routes = Router()

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Testando a api'})
})

routes.get("/ceps", getCeps);
routes.post("/cep", postCeps);
routes.post("/cep/consult", consultCEP);

export default routes;