import { Router } from "express";
import ClientController from "../controllers/client/clientControllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isClientOwnerMiddleware } from "../middlewares/isClientOwner";
import {
  handleClientError,
  validateClientCreate,
} from "../middlewares/schemaValidationClient.middleware";
import {
  handleClientUpdateError,
  validateClientUpdate,
} from "../middlewares/schemaValidationClientUpdate.middleware";

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post(
  "",
  authMiddleware,
  validateClientCreate(handleClientError),
  clientController.store
);
clientRouter.get("", authMiddleware, clientController.index);
clientRouter.patch(
  "/:client_id",
  validateClientUpdate(handleClientUpdateError),
  authMiddleware,
  isClientOwnerMiddleware,
  clientController.update
);
clientRouter.delete(
  "/:client_id",
  authMiddleware,
  isClientOwnerMiddleware,
  clientController.delete
);

export default clientRouter;
