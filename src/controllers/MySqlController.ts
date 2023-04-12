import { Request, Response } from "express";
import Conexao from "./../conexao/Conexao";
import { MySqlRepository } from "../repositorys/MySqlRepository";
class MySqlController {
  public async buscarScript(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { script } = req.body;
      const repository = new MySqlRepository(conexao);
      const result = await repository.buscarScript(script);

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new MySqlController();
