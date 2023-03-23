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
  public async salvarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.body;
      const repository = new UsuarioRepository(conexao);

      let idUsuario = requisicao.idUsuario;
      let login = requisicao.login;
      let senha = requisicao.senha;
      let tipoInclusao = requisicao.tipoInclusao;

      if (tipoInclusao == "I") {
        await repository.inserirUsuario(login, senha);
      } else if (tipoInclusao == "E") {
        await repository.alterarUsuario(idUsuario, login, senha);
      }

      return res.json("ok");
    } catch (err) {
      return res.json(500);
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

      let idUsuario = parseInt(requisicao.idUsuario as string);

      await repository.excluirUsuario(idUsuario);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }

  public async salvarEmpresaUsuario(req: Request, res: Response): Promise<Response> {
    try {
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const requisicao = req.body;
      const repository = new UsuarioRepository(conexao);

      let idUsuario = requisicao.idUsuario;
      let idEmpresa = requisicao.idEmpresa;

      await repository.inserirEmpresaUsuario(idUsuario, idEmpresa);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
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

      let idUsuarioEmpresa = parseInt(requisicao.idUsuarioEmpresa as string);

      await repository.excluirEmpresaUsuario(idUsuarioEmpresa);

      return res.json("ok");
    } catch (err) {
      return res.json(500);
    }
  }
}
export default new UsuarioController();
