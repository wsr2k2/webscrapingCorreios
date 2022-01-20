import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";

const port = 3034;

const app = express()
createConnection()

app.use(routes)


app.listen(port, console.log(`Aplicacao rodando em: http://localhost:${port}/users`));
