import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Users Addresses service API Docs",
      version: "0.1.0",
      description: "This is service to register users and their addresses",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: [`${__dirname}/routes/*.ts`],
};

const specs = swaggerJsdoc(options);

export default function makeSetupSwagger(app: Application) {
  return app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
