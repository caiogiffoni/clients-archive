import { Request, Response } from "express";
import { contactCreateService } from "../../services/contact/contactCreate.service";
import { contactListService } from "../../services/contact/contactList.service";

export default class ContactController {
  //Criando contato
  async store(req: Request, res: Response) {
    const user_id = req.user.id;
    const { name, email, telephone, client_id } = req.body;
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

  //Listar User por Id
  //   async show(req: Request, res: Response) {
  //     const id = req.params.id;
  //     const listbyId = await userListIndexService(id);
  //     return res.status(200).json(listbyId);
  //   }
  //Atualizar User
  // async update(req: Request, res: Response) {
  //   const client_id = req.params.client_id;
  //   const user_id = req.user.id;
  //   const { name, email, telephone } = req.body;

  //   const updateUser = await contactUpdateService({
  //     name,
  //     email,
  //     client_id,
  //     user_id,
  //     telephone,
  //   });
  //   return res.status(200).json(updateUser);
  // }
  //Deletando Client
  // async delete(req: Request, res: Response) {
  //   const client_id = req.params.client_id;
  //   const user_id = req.user.id;

  //   const deleteUser = await contactDeleteService({ client_id, user_id });
  //   return res.status(200).json({ message: "User deleted!" });
  // }
}
