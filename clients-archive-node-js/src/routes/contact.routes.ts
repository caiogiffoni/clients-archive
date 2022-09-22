import { Router } from "express";
import ClientController from "../controllers/client/clientControllers";
import ContactController from "../controllers/contacts/contactsControllers";
import { authMiddleware } from "../middlewares/auth.middleware";
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
  "",
  authMiddleware,
  validateContactCreate(handleContactError),
  contactController.store
);
contactRouter.get("/:client_id", authMiddleware, contactController.index);
contactRouter.patch(
  "/:client_id/:contact_id",
  validateContactUpdate(handleContactUpdateError),
  authMiddleware,
  contactController.update
);
contactRouter.delete(
  "/:client_id/:contact_id",
  authMiddleware,
  contactController.delete
);

export default contactRouter;
