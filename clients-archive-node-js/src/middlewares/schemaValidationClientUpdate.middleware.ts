import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IClientUpdateSchema } from "../interfaces/client";

export const handleClientUpdateError: SchemaOf<IClientUpdateSchema> = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email(),
    telephone: yup.string(),
  });

export const validateClientUpdate =
  (schema: SchemaOf<IClientUpdateSchema>) =>
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
