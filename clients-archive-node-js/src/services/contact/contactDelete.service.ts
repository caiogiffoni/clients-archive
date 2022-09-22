import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";
import { AppError } from "../../errors/appError";
import { IContactDelete } from "../../interfaces/contact";

export const contactDeleteService = async ({
  contact_id,
  user_id,
}: IContactDelete): Promise<void> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: {
      id: contact_id,
      client: {
        user: {
          id: user_id,
        },
      },
    },
  });

  if (!contact) {
    throw new AppError("Contact not found!", 404);
  }

  await contactRepository.remove(contact);
};
