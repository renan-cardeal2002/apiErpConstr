import { Request, Response } from "express";
import { TiposPagamentoRepository } from "../repositorys/TiposPagamentoRepositorys";
import Conexao from "./../conexao/Conexao";

class TiposPagamentoController {
  public async buscarTiposPagamento(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const repository = new TiposPagamentoRepository(conexao);
      const result = await repository.buscarTiposPagamento();

      return res.json(result);
    } catch (err) {
      await conexao.end();
      return res.json(err);
    }
  }
  public async salvarTiposPagamento(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { tipoInclusao, idTipoPagamento, tipoPagamento } = req.body;
      const repository = new TiposPagamentoRepository(conexao);

      if (tipoInclusao === "I") {
        await repository.inserirTiposPagamento(idTipoPagamento, tipoPagamento);
      } else if (tipoInclusao === "E") {
        await repository.alterarTiposPagamento(idTipoPagamento, tipoPagamento);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
  public async excluirTiposPagamento(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new TiposPagamentoRepository(conexao);
      const idTipoPagamento = requisicao.idTipoPagamento as string;
      await repository.excluirTiposPagamento(idTipoPagamento);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
}
export default new TiposPagamentoController();
