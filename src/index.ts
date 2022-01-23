import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import routes from "./routes";

const port = 3035;

const app = express()
try {
  createConnection()
  console.log('📦 Database is runnig!')
} catch (error) {
  throw new Error(error)
}

app.use(express.json())
app.use(routes)


app.listen(port, () => console.log(`Aplicacao rodando em: http://localhost:${port}/ceps`));
