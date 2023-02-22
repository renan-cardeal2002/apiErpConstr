import { Request, Response } from "express";
import { UsuarioRepository } from "../repositorys/UsuarioRepository";
import Conexao from "./../conexao/Conexao";

class UsuarioController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioRepository(conexao);

      let login = requisicao.login as string;
      let senha = requisicao.senha as string;

      let result: any = await repository.login(login, senha);
      let idUsuario = result[0].idUsuario;
      let empresas: any = await repository.buscarEmpresasUsuario(idUsuario);

      let retorno = {
        dadosLogin: result[0],
        empresas: empresas,
      };

      return res.json(retorno);
    } catch (err) {
      return res.json(500);
    }
  }
  public async buscarUsuarios(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioRepository(conexao);

      let result = await repository.buscarUsuarios();

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
  public async buscarEmpresasUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioRepository(conexao);
      let idUsuario = parseInt(requisicao.idUsuario as string);

      let result = await repository.buscarEmpresasUsuario(idUsuario);

      return res.json(result);
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new UsuarioController();
