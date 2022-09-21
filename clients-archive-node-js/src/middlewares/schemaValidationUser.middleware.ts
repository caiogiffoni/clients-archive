import { Request, Response, NextFunction } from "express";
import { IUserRequest } from "../interfaces/user";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const handleUserError: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const validateUserCreate =
  (schema: SchemaOf<IUserRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = validatedData;
      next();
    } catch (err: any) {
      return res.status(400).json({
        status: "error",
        error: err.errors?.join(", "),
      });
    }
  };
