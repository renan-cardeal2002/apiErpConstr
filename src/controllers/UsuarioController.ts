import { Request, Response } from "express";
import { UsuarioRepository } from "../repositorys/UsuarioRepository";
import Conexao from "./../conexao/Conexao";
// import erros from "../services/TratarErroService";
import usuarioService from "../services/usuario.service";
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

      return res.status(200).json({ dadosLogin: result[0], empresas });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async buscarUsuarios(req: Request, res: Response): Promise<Response> {
    try {
      const mongoResult = await usuarioService.list();

      return res.status(200).json(mongoResult);
    } catch (err) {
      return res.status(400).json(err);
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

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async salvarUsuario({ body: { idUsuario, login, senha, tipoInclusao, empresas, aplicacoes } }: Request, res: Response) {
    try {
      if (tipoInclusao === "I") {
        await usuarioService.create({ login, senha });
      } else if (tipoInclusao === "E") {
        await usuarioService.update(idUsuario, { login, senha, empresas, aplicacoes });
      }

      return res.sendStatus(204);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ message: err.message });
    }
  }
  public async excluirUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const requisicao = req.query;
      const idUsuario = parseInt(requisicao.idUsuario as string);
      await usuarioService.remove(idUsuario);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
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

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
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

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
export default new UsuarioController();
