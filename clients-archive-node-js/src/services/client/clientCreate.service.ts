import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { User } from "../../entities/User";
import { AppError } from "../../errors/appError";
import { IClient, IClientCreate } from "../../interfaces/client";

export const clientCreateService = async ({
  name,
  email,
  telephone,
  id,
}: IClientCreate): Promise<IClient> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const userRepository = AppDataSource.getRepository(User);
  const checkUserExists = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (!checkUserExists) {
    throw new AppError("No user found", 404);
  }
  // AJUSTAR UNIQUE EMAIL PARA CADA USER APENAS
  const checkClientExists = await clientRepository.findOne({
    where: {
      email,
      user: {
        id: id,
      },
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

  client.user = checkUserExists;

  await clientRepository.save(client);

  return client;
};
