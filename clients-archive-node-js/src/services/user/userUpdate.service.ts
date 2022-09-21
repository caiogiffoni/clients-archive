// import { AppDataSource } from "../../data-source";
// import { User } from "../../entities/User";
// import * as bcrypt from "bcryptjs";
// import { IUser, IUserUp } from "../../interfaces/user";
// import AppError from "../../errors/appError";

// const userUpdateService = async ({
//   id,
//   name,
//   email,
//   password,
//   user,
// }: IUserUp): Promise<IUser> => {
//   const userRepository = AppDataSource.getRepository(User);

//   const users = await userRepository.findOne({
//     where: { id },
//   });
//   if (!users) {
//     throw new AppError("User not found!", 404);
//   }

//   if (user !== id) {
//     throw new AppError("Has to be the same user", 403);
//   }

//   if (isAdm !== undefined) throw new AppError("Cannot change isAdm for an User", 403);

//   name ? (users.name = name) : users.name;
//   email ? (users.email = email) : users.email;
//   password ? (users.password = await bcrypt.hash(password, 10)) : users.password;

//   return userRepository.save(users);
// };
// export default userUpdateService;
