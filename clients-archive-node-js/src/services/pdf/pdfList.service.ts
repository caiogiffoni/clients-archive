import { response } from "express";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Clients";
import { Contact } from "../../entities/Contact";
import { AppError } from "../../errors/appError";
import { IContact, IContactList } from "../../interfaces/contact";

export const pdfListService = async ({
  id,
  client_id,
}: IContactList): Promise<any> => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition: TDocumentDefinitions = {
    defaultStyle: { font: "Helvetica" },
    content: [{ text: "oi banna de pijamaas asee " }],
  };

  pdfMake.createPdf(docDefinition).open();

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  const chunks: any = [];

  pdfDoc.on("data", (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.end();

  pdfDoc.on("end", () => {
    const result = Buffer.concat(chunks);
    response.end(result);
    // return result;
    return "oi";
  });

  // return "oi";
  //   const clientRepository = AppDataSource.getRepository(Client);
  //   const client = await clientRepository.find({
  //     where: {
  //       id: client_id,
  //       user: {
  //         id,
  //       },
  //     },
  //   });

  //   if (!client) {
  //     throw new AppError("Client not found!", 404);
  //   }

  //   const contactRepository = AppDataSource.getRepository(Contact);

  //   const contacts = await contactRepository.find({
  //     where: {
  //       client: {
  //         id: client_id,
  //         user: {
  //           id,
  //         },
  //       },
  //     },
  //   });

  //   const newContacts = contacts.map((contact) => {
  //     return {
  //       ...contact,
  //       client: {
  //         ...contact.client,
  //         user: {
  //           id: contact.client.user.id,
  //           name: contact.client.user.name,
  //           email: contact.client.user.email,
  //           created_at: contact.client.user.created_at,
  //         },
  //       },
  //     };
  //   });

  //   return newContacts;
};
