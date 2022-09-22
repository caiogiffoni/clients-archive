import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/Clients";
import { AppError } from "../errors/appError";

export const isClientOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { client_id } = req.params;

  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      id: client_id,
    },
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }
  if (client.user.id != id) {
    throw new AppError("No permission to perfom this action", 401);
  }

  next();
};
