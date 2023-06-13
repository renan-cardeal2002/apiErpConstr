import { Request, Response } from "express";
import { PessoaRepository } from "../repositorys/PessoaRepository";
import Conexao from "./../conexao/Conexao";
import pessoaService from "../services/pessoa.service";

class PessoaController {
  public async buscarPessoas(req: Request, res: Response): Promise<Response> {
    try {
      const result = await pessoaService.list();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async salvarPessoa(req: Request, res: Response): Promise<Response> {
    try {
      const { idEmpresa, idPessoa, enderecos, tipoInclusao, nome, cnpjCpf, tipoPessoa, situacao, flagFuncionario, flagCliente, flagFornecedor, tipoFuncionario, equipe, inscricaoMunicipal, rg, inscricaoEstadual } = req.body;

      if (tipoInclusao === "I") {
        await pessoaService.create({ nome, cnpjCpf, enderecos, tipoPessoa, situacao, flagFuncionario, flagCliente, flagFornecedor, tipoFuncionario, equipe, inscricaoMunicipal, rg, inscricaoEstadual });
      } else if (tipoInclusao === "E") {
        await pessoaService.update(idPessoa, { nome, cnpjCpf, enderecos, tipoPessoa, situacao, flagFuncionario, flagCliente, flagFornecedor, tipoFuncionario, equipe, inscricaoMunicipal, rg, inscricaoEstadual });
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async excluirPessoa(req: Request, res: Response): Promise<Response> {
    try {
      const requisicao = req.query;
      const idPessoa = requisicao.idPessoa as string;
      await pessoaService.remove(idPessoa);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
export default new PessoaController();
