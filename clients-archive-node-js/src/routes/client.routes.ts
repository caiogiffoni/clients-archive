import { Router } from "express";
import ClientController from "../controllers/client/clientControllers";
import {
  handleClientError,
  validateClientCreate,
} from "../middlewares/schemaValidationClient.middleware";

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post(
  "",
  validateClientCreate(handleClientError),
  clientController.store
);

export default clientRouter;
