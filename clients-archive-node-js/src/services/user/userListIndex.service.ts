import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/appError";
import { IUser } from "../../interfaces/user";

export const userListIndexService = async (id: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find();

  const users = user.find((userId) => userId.id === id);

  if (!users) {
    throw new AppError("User not found!", 404);
  }
  return users;
};
