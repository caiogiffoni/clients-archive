import { Request, Response } from "express";
import { pdfListService } from "../../services/pdf/pdfList.service";

export default class pdfController {
  // Listando todos os contatos
  async index(req: Request, res: Response) {
    const { id } = req.user;
    const { client_id } = req.params;
    const pdf = await pdfListService({ id, client_id });
    console.log(pdf, "pdf");
    return res.end(pdf);
    // return res.status(200).json(pdf);
  }
}
