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
      let idEmpresa = parseInt(requisicao.idEmpresa as string);

      let result = await repository.buscarEquipes(idEmpresa);

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
      let idEmpresa = parseInt(requisicao.idEmpresa as string);

      let tipoInclusao = requisicao.tipoInclusao;
      let nome = requisicao.nome;
      let idEquipe = requisicao.idEquipe;

      if (tipoInclusao == "I") {
        await repository.inserirEquipe(idEmpresa, nome);
      } else if (tipoInclusao == "E") {
        await repository.alterarEquipe(idEmpresa, idEquipe, nome);
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

      let idEmpresa = parseInt(requisicao.idEmpresa as string);
      let idEquipe = parseInt(requisicao.idEquipe as string);

      await repository.excluirEquipe(idEmpresa, idEquipe);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new EquipeController();
