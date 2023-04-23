import { Request, Response } from "express";
import { UsuarioRepository } from "../repositorys/UsuarioRepository";
import Conexao from "./../conexao/Conexao";
import erros from "../services/TratarErroService";
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
      var conexao: any = await Conexao.connectDb();
    } catch (err) {
      return res.status(500);
    }
    try {
      const repository = new UsuarioRepository(conexao);
      const result = await repository.buscarUsuarios();

      return res.status(200).json(result);
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
  public async salvarUsuario({ body: { idUsuario, login, senha, tipoInclusao } }: Request, res: Response): Promise<Response> {
    let conexao;

    try {
      conexao = await Conexao.connectDb();
    } catch (err) {
      return res.status(500).json({ message: erros.tratarErro(500) });
    }

    const repository = new UsuarioRepository(conexao);

    try {
      if (tipoInclusao === "I") {
        await repository.inserirUsuario(login, senha);
      } else if (tipoInclusao === "E") {
        await repository.alterarUsuario(idUsuario, login, senha);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json({ message: err.message });
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
