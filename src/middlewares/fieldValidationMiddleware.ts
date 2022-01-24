import { Request, Response, NextFunction } from 'express';

export async function fieldValidation(req: Request, res: Response, next: NextFunction) {

  if(!req.body.cep) {
    res.status(400).json({ message: "O cep deve ser preenchido!"})
    return;
  } if(req.body.cep.length != 8) {
      res.status(400).json({ Error: "O cep deve ser preenchido corretamente com 8 digitos e sem traço" })
      return
  } else {
    next();
  }
}

