import { Router } from "express";
import ClientController from "../controllers/client/clientControllers";
import ContactController from "../controllers/contacts/contactsControllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.post(
  "",
  authMiddleware,
  // validatecontactCreate(handlecontactError),
  contactController.store
);
contactRouter.get("/:client_id", authMiddleware, contactController.index);
// contactRouter.patch(
//   "/:contact_id",
//   // validatecontactUpdate(handlecontactUpdateError),
//   authMiddleware,
//   contactController.update
// );
// contactRouter.delete("/:contact_id", authMiddleware, contactController.delete);

export default contactRouter;
