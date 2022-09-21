import { AppDataSource } from "../../data-source";
import { IClient } from "../../interfaces/client";
import { Client } from "../../entities/Clients";

export const clientListService = async (id: string): Promise<IClient[]> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.find({
    where: {
      user: {
        id: id,
      },
    },
  });

  return clients;
};
