import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IClientRequest } from "../interfaces/client";

export const handleClientError: SchemaOf<IClientRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  telephone: yup.string().required(),
});

export const validateClientCreate =
  (schema: SchemaOf<IClientRequest>) =>
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
        code: "400",
        error: err.errors?.join(", "),
      });
    }
  };
