import { User } from "../../entities/User";
import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { IUser, IUserRequest } from "../../interfaces/user";
import  AppError  from "../../errors/appError";

const userCreateService = async ({
  name,
  email,
  password,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const checkUserExists = await userRepository.findOne({
    where: {
      email,
    },
  });
  if (checkUserExists) {
    throw new AppError("This email already exists", 401);
  }
  const hashedPassword = await hash(password, 10);
  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  const newUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return newUser
};

export default userCreateService;
