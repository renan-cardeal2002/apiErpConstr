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
      const idUsuario = parseInt(requisicao.idUsuario as string);
      const idEmpresa = parseInt(requisicao.idEmpresa as string);
      const result = await repository.buscarAplicacoesUsuario(idUsuario, idEmpresa);

      return res.json(result);
    } catch (err) {
      return res.json(err);
    }
  }
  public async salvarAplicacaoUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { idUsuario, idEmpresa, idAplicacao } = req.body;
      const repository = new UsuarioAplicacaoRepository(conexao);
      await repository.inserirAplicacaoUsuario(idUsuario, idEmpresa, idAplicacao);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
  public async excluirAplicacaoUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioAplicacaoRepository(conexao);
      const idUsuarioAplicacao = parseInt(requisicao.idUsuarioAplicacao as string);
      await repository.excluirAplicacaoUsuario(idUsuarioAplicacao);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
}
export default new UsuarioAplicacaoController();
