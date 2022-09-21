import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { AppError } from "../../errors/appError";
import { IClientDelete } from "../../interfaces/client";

export const clientDeleteService = async ({
  client_id,
  user_id,
}: IClientDelete): Promise<void> => {
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

  await clientRepository.remove(client);
};
