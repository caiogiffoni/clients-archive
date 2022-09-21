import express from "express";
import "express-async-errors"; // tem que ficar acima do approutes
import { appRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);

export default app;
