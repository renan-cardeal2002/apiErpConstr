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

      let result = await repository.buscarProdutos();

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

      if (tipoInclusao == "I") {
        await repository.inserirProduto();
      } else if (tipoInclusao == "E") {
        await repository.alterarProduto();
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

      await repository.excluirProduto(idProduto);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new ProdutoController();
