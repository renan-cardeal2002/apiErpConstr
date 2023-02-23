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
      console.log(result);

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
  public async salvarAplicacaoUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.body;
      const repository = new UsuarioAplicacaoRepository(conexao);

      let idUsuario = requisicao.idUsuario;
      let idAplicacao = requisicao.idAplicacao;

      console.log(requisicao);
      await repository.inserirAplicacaoUsuario(idUsuario, idAplicacao);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
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

      let idUsuarioAplicacao = parseInt(requisicao.idUsuarioAplicacao as string);

      await repository.excluirAplicacaoUsuario(idUsuarioAplicacao);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new UsuarioAplicacaoController();
