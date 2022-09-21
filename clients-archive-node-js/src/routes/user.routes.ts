import { Router } from "express";
import UserController from "../controllers/user/userControllers";
import { handleUserError, validateUserCreate } from "../middlewares/schemaValidationUser.middleware";


const userRouter = Router();
const userController = new UserController();
// userRouter.post("", validateUserCreate(handleUserError), userController.store);
userRouter.post("", validateUserCreate(handleUserError), userController.store);
userRouter.get("",  userController.index);
// userRouter.get("/:id", userController.show);
// userRouter.patch("/:id", authMiddleware, userController.update);
// userRouter.delete("/:id", authMiddleware, userController.delete);

export default userRouter;
