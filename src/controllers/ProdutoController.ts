import { Request, Response } from "express";
import Conexao from "./../conexao/Conexao";
import { ProdutoRepository } from "../repositorys/ProdutoRepository";

class ProdutoController {
  public async buscarProdutos(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new ProdutoRepository(conexao);
      const idEmpresa = parseInt(requisicao.idEmpresa as string);
      const result = await repository.buscarProdutos(idEmpresa);

      return res.json(result);
    } catch (err) {
      return res.json(err);
    }
  }
  public async salvarProduto(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { tipoInclusao, idProduto, idEmpresa, descricao, situacao } = req.body;
      const repository = new ProdutoRepository(conexao);

      if (tipoInclusao === "I") {
        await repository.inserirProduto(idEmpresa, descricao, situacao);
      } else if (tipoInclusao === "E") {
        await repository.alterarProduto(idProduto, idEmpresa, descricao, situacao);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
  public async excluirProduto(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new ProdutoRepository(conexao);
      const idProduto = parseInt(requisicao.idProduto as string);
      const idEmpresa = parseInt(requisicao.idEmpresa as string);
      await repository.excluirProduto(idProduto, idEmpresa);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
}
export default new ProdutoController();
