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
      const requisicao = req.query;
      const repository = new AplicacaoRepository(conexao);

      let result = await repository.buscarAplicacoes();

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
  public async salvarAplicacao(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.body;
      const repository = new AplicacaoRepository(conexao);

      let tipoInclusao = requisicao.tipoInclusao;
      let idAplicacao = requisicao.idAplicacao;
      let idSistema = requisicao.idSistema;
      let nomeAplicativo = requisicao.nomeAplicativo;
      let situacao = requisicao.situacao;

      if (tipoInclusao == "I") {
        await repository.inserirAplicacao(idAplicacao, idSistema, nomeAplicativo, situacao);
      } else if (tipoInclusao == "E") {
        await repository.alterarAplicacao(idAplicacao, idSistema, nomeAplicativo, situacao);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(500);
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

      let idAplicacao = requisicao.idAplicacao as string;

      await repository.excluirAplicacao(idAplicacao);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new AplicacaoController();
