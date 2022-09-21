import { Router } from "express";
import ClientController from "../controllers/client/clientControllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  handleClientError,
  validateClientCreate,
} from "../middlewares/schemaValidationClient.middleware";

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post(
  "",
  authMiddleware,
  validateClientCreate(handleClientError),
  clientController.store
);
clientRouter.get("", authMiddleware, clientController.index);
clientRouter.patch("/:client_id", authMiddleware, clientController.update);
clientRouter.delete("/:client_id", authMiddleware, clientController.delete);

export default clientRouter;
