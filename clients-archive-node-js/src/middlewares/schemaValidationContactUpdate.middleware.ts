import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IContactSchemaUpdate } from "../interfaces/contact";

export const handleContactUpdateError: SchemaOf<IContactSchemaUpdate> = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email(),
    telephone: yup.string(),
  });

export const validateContactUpdate=
  (schema: SchemaOf<IContactSchemaUpdate>) =>
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
