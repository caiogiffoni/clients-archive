import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import { IUser } from "../../interfaces/user";

export const userListService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};