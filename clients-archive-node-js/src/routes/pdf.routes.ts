import { Router } from "express";
import ClientController from "../controllers/client/clientControllers";
import ContactController from "../controllers/contacts/contactsControllers";
import pdfController from "../controllers/pdfs/pdfControllers";
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

const pdfRouter = Router();
const pdfControllerRouter = new pdfController();

pdfRouter.get(
  "/:client_id",
  authMiddleware,
  isClientOwnerMiddleware,
  pdfControllerRouter.index
);

export default pdfRouter;
