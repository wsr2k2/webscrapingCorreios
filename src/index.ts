import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import routes from "./routes";

const port = 3034;

const app = express()
createConnection()

app.use(express.json())
app.use(routes)


app.listen(port, () => console.log(`Aplicacao rodando em: http://localhost:${port}/ceps`));
