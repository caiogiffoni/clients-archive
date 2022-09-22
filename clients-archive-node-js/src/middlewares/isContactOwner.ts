import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/Contact";
import { AppError } from "../errors/appError";

export const isContactOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { contact_id } = req.params;

  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: {
      id: contact_id,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  console.log(contact);
  if (contact.client.user.id != id) {
    throw new AppError("No permission to perfom this action", 401);
  }

  next();
};
