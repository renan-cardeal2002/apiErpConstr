import { Request, Response } from "express";
import { PessoaRepository } from "../repositorys/PessoaRepository";
import Conexao from "./../conexao/Conexao";

class PessoaController {
  public async buscarPessoas(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const repository = new PessoaRepository(conexao);
      const result = await repository.buscarPessoas();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async salvarPessoa(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { idEmpresa, idPessoa, tipoInclusao, nome, cnpjCpf, tipoPessoa, situacao, funcionario, cliente, fornecedor, tipoFuncionario, idEquipe } = req.body;
      const repository = new PessoaRepository(conexao);

      if (tipoInclusao === "I") {
        await repository.inserirPessoa(idEmpresa, nome, cnpjCpf, tipoPessoa, situacao, funcionario, cliente, fornecedor, tipoFuncionario, idEquipe);
      } else if (tipoInclusao === "E") {
        await repository.alterarPessoa(idPessoa, idEmpresa, nome, cnpjCpf, tipoPessoa, situacao, funcionario, cliente, fornecedor, tipoFuncionario, idEquipe);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async excluirPessoa(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new PessoaRepository(conexao);
      const idPessoa = parseInt(requisicao.idPessoa as string);
      await repository.excluirPessoa(idPessoa);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
export default new PessoaController();
