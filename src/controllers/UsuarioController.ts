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

      const login = requisicao.login as string;
      const senha = requisicao.senha as string;

      const result: any = await repository.login(login, senha);
      const empresas = await repository.buscarEmpresasUsuario(result[0].idUsuario);

      return res.json({ dadosLogin: result[0], empresas });
    } catch (err) {
      return res.json(err);
    }
  }
  public async buscarUsuarios(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const repository = new UsuarioRepository(conexao);
      const result = await repository.buscarUsuarios();

      return res.json(result);
    } catch (err) {
      return res.json(err);
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
      const idUsuario = parseInt(requisicao.idUsuario as string);
      const result = await repository.buscarEmpresasUsuario(idUsuario);

      return res.json(result);
    } catch (err) {
      return res.json(err);
    }
  }
  public async salvarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { idUsuario, login, senha, tipoInclusao } = req.body;
      const repository = new UsuarioRepository(conexao);

      if (tipoInclusao === "I") {
        await repository.inserirUsuario(login, senha);
      } else if (tipoInclusao === "E") {
        await repository.alterarUsuario(idUsuario, login, senha);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
  public async excluirUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioRepository(conexao);
      const idUsuario = parseInt(requisicao.idUsuario as string);
      await repository.excluirUsuario(idUsuario);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }

  public async salvarEmpresaUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const { idUsuario, idEmpresa } = req.body;
      const repository = new UsuarioRepository(conexao);
      await repository.inserirEmpresaUsuario(idUsuario, idEmpresa);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
  public async excluirEmpresaUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.query;
      const repository = new UsuarioRepository(conexao);
      const idUsuarioEmpresa = parseInt(requisicao.idUsuarioEmpresa as string);
      await repository.excluirEmpresaUsuario(idUsuarioEmpresa);

      return res.json("ok");
    } catch (err) {
      return res.json(err);
    }
  }
}
export default new UsuarioController();
