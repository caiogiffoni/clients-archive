import { Express } from "express";
import userRouter from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRouter);
};
