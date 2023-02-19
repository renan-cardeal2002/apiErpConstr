import { Request, Response } from "express";
import { TiposPagamentoRepository } from "../repositorys/TiposPagamentoRepositorys";
import Conexao from "./../conexao/Conexao";

class TiposPagamentoController {
  public async buscarTiposPagamento(req: Request, res: Response): Promise<Response> {
    try {
      var conexao = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new TiposPagamentoRepository();

      let s_sql = await repository.buscarTiposPagamento();
      let result = conexao.query(s_sql);

      console.log(result);
      await conexao.end();
      return res.json(result);
    } catch (err) {
      await conexao.end();
      return res.json(500);
    }
  }
}
export default new TiposPagamentoController();
