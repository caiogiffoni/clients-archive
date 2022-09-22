import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";
import { IContact, IContactList } from "../../interfaces/contact";

export const contactListService = async ({
  id,
  client_id,
}: IContactList): Promise<IContact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find({
    where: {
      client: {
        id: client_id,
        user: {
          id,
        },
      },
    },
  });

  return contacts;
};
