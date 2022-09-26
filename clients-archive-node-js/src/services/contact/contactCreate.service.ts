import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { Contact } from "../../entities/Contact";
import { AppError } from "../../errors/appError";
import { IContact, IContactRequest } from "../../interfaces/contact";

export const contactCreateService = async ({
  name,
  email,
  telephone,
  client_id,
  user_id,
}: IContactRequest): Promise<IContact> => {
  const clientRepository = AppDataSource.getRepository(Client);
  // tratar erro de not id
  const client = await clientRepository.findOne({
    where: {
      id: client_id,
    },
  });
  if (!client) {
    throw new AppError("No client found", 404);
  }

  const contactRepository = AppDataSource.getRepository(Contact);

  // AJUSTAR UNIQUE EMAIL PARA CADA USER APENAS
  const checkContactExists = await contactRepository.findOne({
    where: {
      email,
      client: {
        id: client_id,
      },
    },
  });

  if (checkContactExists) {
    throw new AppError(
      "This email already exists on your contacts for this client",
      401
    );
  }

  const contact = contactRepository.create({
    name,
    email,
    telephone,
  });

  contact.client = client;

  await contactRepository.save(contact);

  const newContact = {
    ...contact,
    client: {
      ...contact.client,
      user: {
        id: contact.client.user.id,
        name: contact.client.user.name,
        email: contact.client.user.email,
        created_at: contact.client.user.created_at,
      },
    },
  };

  return newContact;
};
