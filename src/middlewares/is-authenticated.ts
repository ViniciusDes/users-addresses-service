import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = req.headers["authorization"];
  console.log("jwt", jwt);
  const chavePrivada = "consolelog.com.br";

  // Efetuando a validação do JWT:
  const jwtService = require("jsonwebtoken");
  jwtService.verify(jwt, chavePrivada, (err: any, userInfo: any) => {
    if (err) {
      res.status(403).send();
      return;
    }

    res.json(userInfo);
  });
};
