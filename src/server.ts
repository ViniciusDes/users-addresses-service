require("dotenv").config();

import express from "express";
import { Router, Request, Response } from "express";
import AppDataSource from "./infra/database/data-source";

const app = express();

const route = Router();

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Service is running" });
});

app.use(route);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );
app.listen(3333, () => "server running");
