import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { AppError } from "../../errors/appError";
import { IClient, IClientRequest } from "../../interfaces/client";

export const clientCreateService = async ({
  name,
  email,
  telephone,
}: IClientRequest): Promise<IClient> => {
  const clientRepository = AppDataSource.getRepository(Client);
  // AJUSTAR UNIQUE EMAIL PARA CADA USER APENAS
  const checkClientExists = await clientRepository.findOne({
    where: {
      email,
    },
  });

  if (checkClientExists) {
    throw new AppError("This email already exists on your contacts", 401);
  }
  const client = clientRepository.create({
    name,
    email,
    telephone,
  });

  await clientRepository.save(client);

  return client;
};
