import { Request, Response } from "express";
import { UsuarioRepository } from "../repositorys/UsuarioRepository";
import Conexao from "./../conexao/Conexao";

class UsuarioController {
  public async buscarUsuarios(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioRepository(conexao);

      let result = await repository.buscarUsuarios();

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new UsuarioController();
