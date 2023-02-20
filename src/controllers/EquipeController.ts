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
      console.log(result);
      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
  public async salvarEquipe(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.body;
      const repository = new EquipeRepository(conexao);

      let tipoInclusao = requisicao.tipoInclusao;
      let nome = requisicao.nome;
      let idEquipe = requisicao.idEquipe;

      if (tipoInclusao == "I") {
        await repository.inserirEquipe(nome);
      } else if (tipoInclusao == "E") {
        await repository.alterarEquipe(idEquipe, nome);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
  public async excluirEquipe(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new EquipeRepository(conexao);

      let idEquipe = parseInt(requisicao.idEquipe as string);

      await repository.excluirEquipe(idEquipe);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new EquipeController();
