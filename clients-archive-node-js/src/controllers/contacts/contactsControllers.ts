import { Request, Response } from "express";
import { contactCreateService } from "../../services/contact/contactCreate.service";
import { contactDeleteService } from "../../services/contact/contactDelete.service";
import { contactListService } from "../../services/contact/contactList.service";
import { contactUpdateService } from "../../services/contact/contactUpdate.service";

export default class ContactController {
  //Criando contato
  async store(req: Request, res: Response) {
    const user_id = req.user.id;
    const { client_id } = req.params;
    const { name, email, telephone } = req.body;
    const createUser = await contactCreateService({
      name,
      email,
      telephone,
      user_id,
      client_id,
    });
    return res.status(201).json(createUser);
  }

  // Listando todos os contatos
  async index(req: Request, res: Response) {
    const { id } = req.user;
    const { client_id } = req.params;
    const users = await contactListService({ id, client_id });
    return res.status(200).json(users);
  }

  //Listar contatos por Id
  //   async show(req: Request, res: Response) {
  //     const id = req.params.id;
  //     const listbyId = await userListIndexService(id);
  //     return res.status(200).json(listbyId);
  //   }

  //Atualizar Contato
  async update(req: Request, res: Response) {
    const { client_id } = req.params;
    const { contact_id } = req.params;
    const user_id = req.user.id;
    const { name, email, telephone } = req.body;

    const updateUser = await contactUpdateService({
      name,
      email,
      client_id,
      user_id,
      telephone,
      contact_id,
    });
    return res.status(200).json(updateUser);
  }

  //Deletando Contato
  async delete(req: Request, res: Response) {
    const { contact_id } = req.params;
    const user_id = req.user.id;

    const deleteUser = await contactDeleteService({ contact_id, user_id });
    return res.status(200).json({ message: "Contact deleted!" });
  }
}
