import { Router, Request, Response} from "express"
import { getCeps, postCeps } from "./controller/cep.controller"



const routes = Router()

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Testando a api'})
})

routes.get("/ceps", getCeps);
routes.post("/cep", postCeps);

export default routes;