import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { AppError } from "../../errors/appError";
import { IClientUpdate } from "../../interfaces/client";

export const clientUpdateService = async ({
  email,
  client_id,
  name,
  telephone,
  user_id,
}: IClientUpdate): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      id: client_id,
      user: {
        id: user_id,
      },
    },
  });

  if (!client) {
    throw new AppError("Client not found!", 404);
  }

  const updatedZone = {
    ...client,
    name,
    email,
    telephone,
  };

  return clientRepository.save(updatedZone);
};
