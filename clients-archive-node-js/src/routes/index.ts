import { Express } from "express";
import clientRouter from "./client.routes";
import loginRouter from "./login.routes";
import userRouter from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRouter);
  app.use("/login", loginRouter);
  app.use("/client", clientRouter);
};
