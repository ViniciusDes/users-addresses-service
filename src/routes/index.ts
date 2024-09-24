import express, { Request, Response } from "express";
import userRouter from "./user.route";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Service is running" });
});

router.use("/users", userRouter);

export { router };
