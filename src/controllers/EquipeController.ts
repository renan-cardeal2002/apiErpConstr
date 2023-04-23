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
      const idEmpresa = parseInt(requisicao.idEmpresa as string);
      const result = await repository.buscarEquipes(idEmpresa);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async salvarEquipe(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { idEmpresa, tipoInclusao, nome, idEquipe } = req.body;
      const repository = new EquipeRepository(conexao);

      if (tipoInclusao === "I") {
        await repository.inserirEquipe(idEmpresa, nome);
      } else if (tipoInclusao === "E") {
        await repository.alterarEquipe(idEmpresa, idEquipe, nome);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
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
      const idEmpresa = parseInt(requisicao.idEmpresa as string);
      const idEquipe = parseInt(requisicao.idEquipe as string);
      await repository.excluirEquipe(idEmpresa, idEquipe);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
export default new EquipeController();
