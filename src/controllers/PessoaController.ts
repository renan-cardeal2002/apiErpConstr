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
      const requisicao = req.query;
      const repository = new PessoaRepository(conexao);

      let result = await repository.buscarPessoas();

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
  public async salvarPessoa(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.body;
      const repository = new PessoaRepository(conexao);

      let idEmpresa = requisicao.idEmpresa;
      let idPessoa = requisicao.idPessoa;
      let tipoInclusao = requisicao.tipoInclusao;
      let nome = requisicao.nome;
      let cnpjCpf = requisicao.cnpjCpf;
      let tipoPessoa = requisicao.tipoPessoa;
      let situacao = requisicao.situacao;
      let funcionario = requisicao.funcionario;
      let cliente = requisicao.cliente;
      let fornecedor = requisicao.fornecedor;
      let tipoFuncionario = requisicao.tipoFuncionario;
      let idEquipe = requisicao.idEquipe;

      if (tipoInclusao == "I") {
        await repository.inserirPessoa(idEmpresa, nome, cnpjCpf, tipoPessoa, situacao, funcionario, cliente, fornecedor, tipoFuncionario, idEquipe);
      } else if (tipoInclusao == "E") {
        await repository.alterarPessoa(idPessoa, idEmpresa, nome, cnpjCpf, tipoPessoa, situacao, funcionario, cliente, fornecedor, tipoFuncionario, idEquipe);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(500);
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

      let idPessoa = parseInt(requisicao.idPessoa as string);

      await repository.excluirPessoa(idPessoa);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new PessoaController();
