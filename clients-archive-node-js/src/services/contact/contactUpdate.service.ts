import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { Contact } from "../../entities/Contact";
import { AppError } from "../../errors/appError";
import { IContactUpdate } from "../../interfaces/contact";

export const contactUpdateService = async ({
  email,
  client_id,
  name,
  telephone,
  user_id,
  contact_id,
}: IContactUpdate): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: {
      id: contact_id,
      client: {
        id: client_id,
        user: {
          id: user_id,
        },
      },
    },
  });

  if (!contact) {
    throw new AppError("Contact not found!", 404);
  }

  const updatedContact = {
    ...contact,
    name,
    email,
    telephone,
  };

  return contactRepository.save(updatedContact);
};
