import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUserLogin } from "../../interfaces/user";
import "dotenv/config";
import AppError from "../../errors/appError";

export const userLoginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  //retorna o token string
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Wrong email/password", 403);
  }

  const comparePassword = await compare(password, user.password);

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 403);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY as string, //preciso desse alias pq caso contrário gera error.
    {
      expiresIn: "24h",
    }
  );

  return token;
};
