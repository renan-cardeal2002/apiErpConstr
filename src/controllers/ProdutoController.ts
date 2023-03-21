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

      let idEmpresa = parseInt(requisicao.idEmpresa as string);

      let result = await repository.buscarProdutos(idEmpresa);

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
  public async salvarProduto(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.body;
      const repository = new ProdutoRepository(conexao);

      let tipoInclusao = requisicao.tipoInclusao;
      let idProduto = requisicao.idProduto;
      let idEmpresa = requisicao.idEmpresa;
      let descricao = requisicao.descricao;
      let situacao = requisicao.situacao;

      if (tipoInclusao == "I") {
        await repository.inserirProduto(idEmpresa, descricao, situacao);
      } else if (tipoInclusao == "E") {
        await repository.alterarProduto(idProduto, idEmpresa, descricao, situacao);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(500);
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

      let idProduto = parseInt(requisicao.idProduto as string);
      let idEmpresa = parseInt(requisicao.idEmpresa as string);

      console.log(requisicao);
      await repository.excluirProduto(idProduto, idEmpresa);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new ProdutoController();
