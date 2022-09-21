import { Request, Response } from "express";
import { clientCreateService } from "../../services/client/clientCreate.service";
import { clientListService } from "../../services/client/clientList.service";

export default class ClientController {
  //Criando Cliente
  async store(req: Request, res: Response) {
    const { id } = req.user;
    const { name, email, telephone } = req.body;
    const createUser = await clientCreateService({
      name,
      email,
      telephone,
      id,
    });
    return res.status(201).json(createUser);
  }

  // Listando todos os clientes
    async index(req: Request, res: Response) {
      const { id } = req.user;
      const users = await clientListService(id);
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
  //   const id = req.params.id;
  //   const user = req.user.id;
  //   const { isAdm, name, email, password } = req.body;

  //   const updateUser = await userUpdateService({
  //     isAdm,
  //     name,
  //     email,
  //     password,
  //     id,
  //     user
  //   });
  //   return res.status(200).json({ message: "User updated!" });
  // }
  // //Deletando User
  // async delete(req: Request, res: Response) {
  //   const id = req.params.id;
  //   const user = req.user.id;

  //   const deleteUser = await userDeleteService(id, user);
  //   return res.status(200).json({ message: "User deleted!" });
  // }
}
