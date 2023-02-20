import { Request, Response } from "express";
import { EquipeRepository } from "../repositorys/EquipeRepository";
import Conexao from "./../conexao/Conexao";

class EquipeController {
  public async buscarEquipes(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new EquipeRepository(conexao);

      let result = await repository.buscarEquipes();

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new EquipeController();
