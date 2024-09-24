require("dotenv").config();
import express from "express";
import AppDataSource from "./infra/database/data-source";
import bodyParser from "body-parser";
import makeSetupSwagger from "./swagger-setup";
import { router as routes } from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

makeSetupSwagger(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );
app.listen(3333, () => "server running");
