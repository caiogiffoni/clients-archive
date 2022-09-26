import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { AppError } from "../../errors/appError";
import { IClient, IClientUpdate } from "../../interfaces/client";

export const clientUpdateService = async ({
  email,
  client_id,
  name,
  telephone,
  user_id,
}: IClientUpdate): Promise<IClient> => {
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

    // // AJUSTAR UNIQUE EMAIL PARA CADA USER APENAS
    // const checkContactExists = await clientRepository.findOne({
    //   where: {
    //     email,
    //     client: {
    //       id: client_id,
    //     },
    //   },
    // });

  const updatedClient = {
    ...client,
    name,
    email,
    telephone,
  };

  clientRepository.save(updatedClient)

  const newClient = {
    ...updatedClient,
    user: {
      id: updatedClient.user.id,
      name: updatedClient.user.name,
      email: updatedClient.user.email,
      created_at: updatedClient.user.created_at,
    },
  }

  return newClient
};
