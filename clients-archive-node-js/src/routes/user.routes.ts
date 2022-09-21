import { Router } from "express";
import UserController from "../controllers/user/userControllers";


const userRouter = Router();
const userController = new UserController();
// userRouter.post("", validateUserCreate(handleUserError), userController.store);
userRouter.post("", userController.store);
userRouter.get("",  userController.index);
// userRouter.get("/:id", userController.show);
// userRouter.patch("/:id", authMiddleware, userController.update);
// userRouter.delete("/:id", authMiddleware, userController.delete);

export default userRouter;
