import { Request, Response } from "express";
import { EmpresaRepository } from "../repositorys/EmpresaRepository";
import Conexao from "./../conexao/Conexao";

class EmpresaController {
  public async buscarEmpresas(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const repository = new EmpresaRepository(conexao);
      const result = await repository.buscarEmpresas();

      return res.json(result);
    } catch (err) {
      return res.json(err);
    }
  }
  public async salvarEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { idEmpresa, tipoInclusao, nome, cnpjCpf, tipoPessoa, inscricaoEstadual, inscricaoMunicipal } = req.body;
      const repository = new EmpresaRepository(conexao);

      if (tipoInclusao === "I") {
        await repository.inserirEmpresa(nome, cnpjCpf, tipoPessoa, inscricaoEstadual, inscricaoMunicipal);
      } else if (tipoInclusao === "E") {
        await repository.alterarEmpresa(idEmpresa, nome, cnpjCpf, tipoPessoa, inscricaoEstadual, inscricaoMunicipal);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
  public async excluirEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new EmpresaRepository(conexao);
      let idEmpresa = parseInt(requisicao.idEmpresa as string);
      await repository.excluirEmpresa(idEmpresa);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
}
export default new EmpresaController();
