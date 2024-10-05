import express, { Request, Response } from "express";
import { UsersService } from "../modules/users/services/users.service";

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

userRouter.get("/", async (req: Request, res: Response) => {
  const userService = new UsersService();
  const data = await userService.findUsers();

  res.status(200).json({
    message: "List of users",
    data: data,
  });
});

userRouter.post("/", async (req: Request, res: Response) => {
  const userService = new UsersService();
  const bodyData = req.body;
  const data = await userService.createUser(bodyData);

  res.status(201).json({
    message: "User created successfully",
    data: data,
  });
});

userRouter.patch("/:idUser", async (req: Request, res: Response) => {
  const userService = new UsersService();
  const bodyData = req.body;
  const { idUser } = req.params;

  const data = await userService.updateUser(+idUser, bodyData);

  res.status(204).json({
    message: "User updated successfully",
    data: data,
  });
});

export default userRouter;
