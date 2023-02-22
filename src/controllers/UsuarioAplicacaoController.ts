import { Request, Response } from "express";
import Conexao from "./../conexao/Conexao";
import { UsuarioAplicacaoRepository } from "../repositorys/UsuarioAplicacaoRepository";

class UsuarioAplicacaoController {
  public async buscarAplicacoesUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioAplicacaoRepository(conexao);

      let idUsuario = parseInt(requisicao.idUsuario as string);

      let result = await repository.buscarAplicacoesUsuario(idUsuario);

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new UsuarioAplicacaoController();
