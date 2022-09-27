import { Express } from "express";
import clientRouter from "./client.routes";
import contactRouter from "./contact.routes";
import loginRouter from "./login.routes";
import pdfRouter from "./pdf.routes";
import userRouter from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRouter);
  app.use("/login", loginRouter);
  app.use("/client", clientRouter);
  app.use("/contact", contactRouter);
  app.use("/pdf", pdfRouter);
};
