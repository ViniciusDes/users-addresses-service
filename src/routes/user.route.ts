import express, { NextFunction, Request, Response } from "express";
import { UsersService } from "../modules/users/services/users.service";
import { AuthService } from "../modules/users/services/auth.service";
import { container } from "tsyringe";
// import { container } from "../shared/container";
const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const userService = container.resolve(UsersService);
  const data = await userService.findUsers();

  try {
    res.status(200).json({
      message: "List of users",
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const userService = container.resolve(UsersService);
    const bodyData = req.body;
    const data = await userService.createUser(bodyData);
    try {
      res.status(201).json({
        message: "User created successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
);

userRouter.post("/login", async (req: Request, res: Response, next) => {
  const authService = container.resolve(AuthService);
  const bodyData = req.body;

  try {
    const data = await authService.makeLokin(bodyData.email, bodyData.password);

    res.status(201).json({
      message: "User authenticated successfully",
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.patch(
  "/:idUser",
  async (req: Request, res: Response, next: NextFunction) => {
    const userService = container.resolve(UsersService);
    const bodyData = req.body;
    const { idUser } = req.params;

    const data = await userService.updateUser(+idUser, bodyData);
    try {
      res.status(204).json({
        message: "User updated successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
);

userRouter.delete(
  "/:idUser",
  async (req: Request, res: Response, next: NextFunction) => {
    const userService = container.resolve(UsersService);
    const { idUser } = req.params;

    const data = await userService.deleteUser(idUser);
    try {
      res.status(204).json({
        message: "User deleted successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default userRouter;
