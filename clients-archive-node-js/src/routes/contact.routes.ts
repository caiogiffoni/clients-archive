import { Router } from "express";
import ClientController from "../controllers/client/clientControllers";
import ContactController from "../controllers/contacts/contactsControllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isClientOwnerMiddleware } from "../middlewares/isClientOwner";
import { isContactOwnerMiddleware } from "../middlewares/isContactOwner";
import {
  handleContactError,
  validateContactCreate,
} from "../middlewares/schemaValidationContact.middleware";
import {
  handleContactUpdateError,
  validateContactUpdate,
} from "../middlewares/schemaValidationContactUpdate.middleware";

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.post(
  "/:client_id",
  authMiddleware,
  isClientOwnerMiddleware,
  validateContactCreate(handleContactError),
  contactController.store
);
contactRouter.get(
  "/:client_id",
  authMiddleware,
  isClientOwnerMiddleware,
  contactController.index
);
contactRouter.patch(
  "/:client_id/:contact_id",
  validateContactUpdate(handleContactUpdateError),
  authMiddleware,
  isContactOwnerMiddleware,
  contactController.update
);
contactRouter.delete(
  "/:client_id/:contact_id",
  authMiddleware,
  isContactOwnerMiddleware,
  contactController.delete
);

export default contactRouter;
