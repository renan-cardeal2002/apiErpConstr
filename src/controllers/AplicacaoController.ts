import { Request, Response } from "express";
import Conexao from "./../conexao/Conexao";
import { AplicacaoRepository } from "../repositorys/AplicacaoRepository";

class AplicacaoController {
  public async buscarAplicacoes(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const repository = new AplicacaoRepository(conexao);
      const result = await repository.buscarAplicacoes();

      return res.json(result);
    } catch (err) {
      return res.json(err);
    }
  }
  public async salvarAplicacao(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { tipoInclusao, idAplicacao, idSistema, nomeAplicativo, situacao } = req.body;
      const repository = new AplicacaoRepository(conexao);

      if (tipoInclusao === "I") {
        await repository.inserirAplicacao(idAplicacao, idSistema, nomeAplicativo, situacao);
      } else if (tipoInclusao === "E") {
        await repository.alterarAplicacao(idAplicacao, idSistema, nomeAplicativo, situacao);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
  public async excluirAplicacao(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new AplicacaoRepository(conexao);
      const idAplicacao = requisicao.idAplicacao as string;
      await repository.excluirAplicacao(idAplicacao);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
}
export default new AplicacaoController();
