import { Request, Response } from "express";
import { userCreateService } from "../../services/user/userCreate.service";
import { userListService } from "../../services/user/userList.service";
import { userListIndexService } from "../../services/user/userListIndex.service";
import { userLoginService } from "../../services/user/userLogin.service";

export default class UserController {
  //Criando User
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const createUser = await userCreateService({
      name,
      email,
      password,
    });
    return res.status(201).json(createUser);
  }
  
  //Listando todos os usuários
  async index(req: Request, res: Response) {
    const users = await userListService();
    return res.status(200).json(users);
  }

  //Listar User por Id
  async show(req: Request, res: Response) {
    const id = req.params.id;
    const listbyId = await userListIndexService(id);
    return res.status(200).json(listbyId);
  }
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
    // Login
    async login(req: Request, res: Response) {
      const { email, password } = req.body;
      const token = await userLoginService({ email, password });
      return res.status(201).json({ token });
    }
}
