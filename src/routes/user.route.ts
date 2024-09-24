import express, { Request, Response } from "express";

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - situacao
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of user
 *         situacao:
 *           type: string
 *           description: The situation user
 *         criado_em:
 *           type: string
 *           format: date
 *           description: The created date
 *       example:
 *         id: 12
 *         name: Gael Bessa
 *         situacao: 1 - (Active)
 *         criado_em: 2020-03-10T04:05:06.157Z
 */
/**
 * @swagger
 * tags:
 *   name: User
 * /users:
 *  get:
 *    description: Obtém a lista de clientes
 *    responses:
 *      '200':
 *        description: Clientes obtidos com sucesso
 */

userRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "here is a list of customers",
  });
});

export default userRouter;
