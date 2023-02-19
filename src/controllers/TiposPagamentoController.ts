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
      const requisicao = req.query;
      const repository = new TiposPagamentoRepository(conexao);

      let result = await repository.buscarTiposPagamento();

      console.log(result);
      return res.json(result);
    } catch (err) {
      await conexao.end();
      return res.json(500);
    }
  }
}
export default new TiposPagamentoController();
