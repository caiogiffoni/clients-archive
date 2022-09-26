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

  const newClients = clients.map((c) => {
    return {
      ...c,
      user: {
        id: c.user.id,
        name: c.user.name,
        email: c.user.email,
        created_at: c.user.created_at,
      },
    };
  });

  return newClients;
};
